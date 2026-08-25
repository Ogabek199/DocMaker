import { NextRequest, NextResponse } from "next/server";
import { generateDocx } from "@/lib/docx-processor";
import { DocType, BlankaFields, DavernostFields } from "@/lib/docx-fields";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docType, fields } = body as {
      docType: DocType;
      fields: BlankaFields | DavernostFields;
    };

    if (!docType || !fields) {
      return NextResponse.json(
        { error: "docType va fields kerak" },
        { status: 400 }
      );
    }

    const docxBuffer = generateDocx(docType, fields);

    const filename =
      docType === "blanka"
        ? `Trudovoy_Kontrakt_${(fields as BlankaFields).contractNumber || "21"}.docx`
        : `Doverennost_${(fields as DavernostFields).workerFio?.split(" ")[0] || "doc"}.docx`;

    return new Response(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          filename
        )}"`,
      },
    });
  } catch (error) {
    console.error("DOCX generatsiya xatosi:", error);
    return NextResponse.json(
      { error: "DOCX generatsiya qilishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
