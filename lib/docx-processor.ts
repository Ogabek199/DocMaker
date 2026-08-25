// lib/docx-processor.ts
// Server-side DOCX manipulation: reads template, replaces red groups, returns new DOCX buffer

import PizZip from "pizzip";
import { readFileSync } from "fs";
import { join } from "path";
import {
  DocType,
  BlankaFields,
  DavernostFields,
  BLANKA_GROUP_MAP,
  DAVERNOST_GROUP_MAP,
} from "./docx-fields";

/** Find all consecutive red-run groups in the XML and return their positions */
function findRedGroups(
  xml: string
): { start: number; end: number; combined: string; runStarts: number[] }[] {
  const groups: {
    start: number;
    end: number;
    combined: string;
    runStarts: number[];
  }[] = [];

  // Match all <w:p> paragraphs
  const paraRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
  let paraMatch: RegExpExecArray | null;

  while ((paraMatch = paraRegex.exec(xml)) !== null) {
    const paraStart = paraMatch.index;
    const paraXml = paraMatch[0];

    // Match all <w:r> runs within this paragraph
    const runRegex = /<w:r[ >][\s\S]*?<\/w:r>/g;
    let runMatch: RegExpExecArray | null;

    let currentGroupText = "";
    let currentGroupStart = -1;
    let currentGroupEnd = -1;
    let currentRunStarts: number[] = [];
    let lastRunWasRed = false;

    while ((runMatch = runRegex.exec(paraXml)) !== null) {
      const runXml = runMatch[0];
      const runAbsStart = paraStart + runMatch.index;
      const runAbsEnd = runAbsStart + runXml.length;

      const isRed = /FF0000/i.test(runXml);
      const texts = [...runXml.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(
        (m) => m[1]
      );
      const text = texts.join("");

      if (isRed && text.length > 0) {
        if (!lastRunWasRed) {
          // Start of a new group
          currentGroupStart = runAbsStart;
          currentGroupText = text;
          currentRunStarts = [runAbsStart];
        } else {
          // Continuation of current group
          currentGroupText += text;
          currentRunStarts.push(runAbsStart);
        }
        currentGroupEnd = runAbsEnd;
        lastRunWasRed = true;
      } else {
        if (lastRunWasRed && currentGroupText.length > 0) {
          groups.push({
            start: currentGroupStart,
            end: currentGroupEnd,
            combined: currentGroupText,
            runStarts: currentRunStarts,
          });
          currentGroupText = "";
          currentGroupStart = -1;
          currentRunStarts = [];
        }
        lastRunWasRed = false;
      }
    }

    // Flush last group in paragraph
    if (lastRunWasRed && currentGroupText.length > 0) {
      groups.push({
        start: currentGroupStart,
        end: currentGroupEnd,
        combined: currentGroupText,
        runStarts: currentRunStarts,
      });
    }
  }

  return groups;
}

/** Replace all red runs in a group with a new value cleanly */
function replaceGroup(xml: string, groupStart: number, groupEnd: number, newValue: string): string {
  const groupXml = xml.slice(groupStart, groupEnd);
  
  // Find first red run to get its rPr (properties)
  const firstRunMatch = groupXml.match(/<w:r[ >][\s\S]*?<\/w:r>/);
  let rPrXml = "";
  if (firstRunMatch) {
    const rPrMatch = firstRunMatch[0].match(/<w:rPr[\s\S]*?<\/w:rPr>/);
    if (rPrMatch) {
      rPrXml = rPrMatch[0].replace(/(<w:color[^>]*w:val=")[^"]+(")/gi, '$1000000$2');
    }
  }
  
  const hasSpaces = newValue.startsWith(" ") || newValue.endsWith(" ");
  const spaceAttr = hasSpaces ? ' xml:space="preserve"' : "";
  const newRun = `<w:r>${rPrXml}<w:t${spaceAttr}>${escapeXml(newValue)}</w:t></w:r>`;
  
  return xml.slice(0, groupStart) + newRun + xml.slice(groupEnd);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Format a date string for blanka dates like "«25» 08. 2026" */
export function formatBlankaDate(dateStr: string): string {
  if (!dateStr) return "";
  let match = dateStr.match(/«?(\d{1,2})»?[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return `«${dd.padStart(2, "0")}» ${mm.padStart(2, "0")}. ${yyyy}`;
  }
  match = dateStr.match(/«?(\d{1,2})»?[.\s]*(\d{1,2})[.\s]*(\d{4})/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return `«${dd.padStart(2, "0")}» ${mm.padStart(2, "0")}. ${yyyy}`;
  }
  return dateStr;
}

/** Format combined date range for davernost */
function formatDavernostDates(from: string, until: string): string {
  const fmtFrom = formatBlankaDate(from);
  const fmtUntil = formatBlankaDate(until);
  return `${fmtFrom}.г  по  ${fmtUntil}.г`;
}

/** Main function: generate modified DOCX buffer */
export function generateDocx(
  docType: DocType,
  fields: BlankaFields | DavernostFields
): Buffer {
  const templatePath = join(
    process.cwd(),
    "public",
    "templates",
    docType === "blanka" ? "blanka.docx" : "davernost.docx"
  );

  const content = readFileSync(templatePath);
  const zip = new PizZip(content);

  let xml = zip.file("word/document.xml")!.asText();

  const groups = findRedGroups(xml);

  // Apply replacements in reverse order (so positions stay valid)
  const sortedGroups = [...groups].sort((a, b) => b.start - a.start);

  for (const group of sortedGroups) {
    const idx = groups.indexOf(group);

    let newValue = "";

    if (docType === "blanka") {
      const f = fields as BlankaFields;
      const fieldKey = BLANKA_GROUP_MAP[idx];
      if (!fieldKey) continue;

      if (fieldKey === "startDate") {
        // Group 8 contains both start AND end date in one group
        const formatted =
          formatBlankaDate(f.startDate) +
          "  года  " +
          formatBlankaDate(f.endDate) +
          " года";
        newValue = formatted;
      } else {
        newValue = f[fieldKey];
      }
    } else {
      const f = fields as DavernostFields;
      const fieldKey = DAVERNOST_GROUP_MAP[idx];
      if (!fieldKey) continue;

      if (fieldKey === "dateCombined") {
        newValue = formatDavernostDates(f.validFrom, f.validUntil);
      } else {
        newValue = f[fieldKey as keyof DavernostFields];
      }
    }

    if (newValue !== undefined && newValue !== null) {
      xml = replaceGroup(xml, group.start, group.end, newValue);
    }
  }

  // Ensure ALL remaining red color attributes across the entire document are strictly converted to black
  xml = xml.replace(/(<w:color[^>]*w:val=")[fF]{2}0000(")/gi, '$1000000$2');

  zip.file("word/document.xml", xml);

  return Buffer.from(
    zip.generate({ type: "nodebuffer", compression: "DEFLATE" })
  );
}
