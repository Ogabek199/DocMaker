// lib/docx-fields.ts
// Field definitions for each document type

export type DocType = "blanka" | "davernost";

export interface BlankaFields {
  contractNumber: string;
  workerFio: string;
  passport: string;
  issuedPlace: string;
  issuedDate: string;
  directorFio: string;
  startDate: string;
  endDate: string;
}

export interface DavernostFields {
  workerFio: string;
  passport: string;
  issuedDate: string;
  issuedPlace: string;
  validFrom: string;
  validUntil: string;
}

export const BLANKA_DEFAULTS: BlankaFields = {
  contractNumber: "21",
  workerFio: "ABDUKADIROV BAKHTIYOR IMOMALIEVICH",
  passport: "FA 2786135",
  issuedPlace: "Ферганская область",
  issuedDate: "12.05.2021г",
  directorFio: "SOBIROV DAVLATBEK ATABEKOVICH",
  startDate: "«25» 08. 2026",
  endDate: "«24» 08. 2028",
};

export const DAVERNOST_DEFAULTS: DavernostFields = {
  workerFio: "ABDUKADIROV BAKHTIYOR IMOMALIEVICH",
  passport: "FA 2786135",
  issuedDate: "12.05.2021г",
  issuedPlace: "Ферганская область",
  validFrom: "24.08.2026",
  validUntil: "23.08.2028",
};

// Blanka: group_index → field key (from analysis)
// Group 0: contractNumber, Group 1,2,9: workerFio, Group 3,10: passport
// Group 4,11: issuedPlace, Group 5,12: issuedDate
// Group 6: unknown "21" (year), Group 7: directorFio, Group 8: dates
export const BLANKA_GROUP_MAP: Record<number, keyof BlankaFields> = {
  0: "contractNumber",
  1: "workerFio",
  2: "workerFio",
  3: "passport",
  4: "issuedPlace",
  5: "issuedDate",
  6: "contractNumber", // repeat of year number (keep same)
  7: "directorFio",
  8: "startDate", // will be formatted specially
  9: "workerFio",
  10: "passport",
  11: "issuedPlace",
  12: "issuedDate",
};

// Davernost: group_index → field key (from analysis)
// Group 0: workerFio, Group 1: passport, Group 2: issuedDate
// Group 3,4: issuedPlace (Ферганская + область - split), Group 5,6: repeat
// Group 7: validFrom + validUntil combined
export const DAVERNOST_GROUP_MAP: Record<
  number,
  keyof DavernostFields | "dateCombined"
> = {
  0: "workerFio",
  1: "passport",
  2: "issuedDate",
  3: "issuedPlace",
  4: "issuedPlace",
  5: "issuedPlace",
  6: "issuedPlace",
  7: "dateCombined", // "«validFrom»...г  по  «validUntil»...г"
};
