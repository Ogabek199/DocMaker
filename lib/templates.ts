export interface BlankData {
  // Tashkilot ma'lumotlari
  orgName: string;
  orgNameEn: string;
  orgType: string; // MChJ, AJ, YoQT, XK, Davlat muassasasi...
  inn: string;
  oked: string;

  // Manzil
  address: string;
  city: string;
  region: string;
  zipCode: string;
  country: string;

  // Aloqa
  phone: string;
  fax: string;
  email: string;
  website: string;

  // Bank ma'lumotlari
  bankName: string;
  bankAccount: string;
  mfo: string;

  // Blanka ma'lumotlari
  docNumber: string;
  docDate: string;
  subject: string;
  bodyText: string;
  signature: string;
  position: string;

  // Dizayn
  template: "classic" | "modern" | "minimal" | "corporate";
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
}

export const defaultBlankData: BlankData = {
  orgName: "TOSHKENT SAVDO KOMPANIYASI",
  orgNameEn: "TASHKENT TRADE COMPANY",
  orgType: "MChJ",
  inn: "123456789",
  oked: "46900",

  address: "Chilonzor ko'chasi, 12-uy",
  city: "Toshkent",
  region: "Toshkent shahri",
  zipCode: "100000",
  country: "O'zbekiston",

  phone: "+998 71 123-45-67",
  fax: "+998 71 123-45-68",
  email: "info@company.uz",
  website: "www.company.uz",

  bankName: "Asaka Bank",
  bankAccount: "20208000200123456789",
  mfo: "00441",

  docNumber: "01",
  docDate: new Date().toLocaleDateString("uz-UZ"),
  subject: "",
  bodyText:
    "Hurmatli hamkor,\n\nSizga ushbu xat bilan murojaat qilamiz va o'zaro hamkorligimizni yanada mustahkamlash maqsadida...\n\nHurmat bilan,",
  signature: "",
  position: "Direktor",

  template: "classic",
  primaryColor: "#1e40af",
  secondaryColor: "#dbeafe",
  logoUrl: null,
};

export type TemplateId = "classic" | "modern" | "minimal" | "corporate";

export interface Template {
  id: TemplateId;
  name: string;
  nameUz: string;
  description: string;
  previewColor: string;
}

export const templates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    nameUz: "Klassik",
    description: "An'anaviy rasmiy ko'rinish",
    previewColor: "#1e40af",
  },
  {
    id: "modern",
    name: "Modern",
    nameUz: "Zamonaviy",
    description: "Chap tomonda rangli panel",
    previewColor: "#0f766e",
  },
  {
    id: "minimal",
    name: "Minimal",
    nameUz: "Minimal",
    description: "Ozod va toza dizayn",
    previewColor: "#374151",
  },
  {
    id: "corporate",
    name: "Corporate",
    nameUz: "Korporativ",
    description: "To'q rangdagi header",
    previewColor: "#7c3aed",
  },
];
