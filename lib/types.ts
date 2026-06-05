// Core domain types for Hyroo document generation.

export type EntityType =
  | "Private Limited Company"
  | "Limited Liability Partnership (LLP)"
  | "One Person Company (OPC)"
  | "Partnership Firm"
  | "Sole Proprietorship";

export const ENTITY_TYPES: EntityType[] = [
  "Private Limited Company",
  "Limited Liability Partnership (LLP)",
  "One Person Company (OPC)",
  "Partnership Firm",
  "Sole Proprietorship",
];

export type Industry =
  | "Technology / SaaS"
  | "Fintech"
  | "E-commerce / D2C"
  | "Healthcare / HealthTech"
  | "Manufacturing"
  | "Services / Consulting"
  | "Media / Content"
  | "Other";

export const INDUSTRIES: Industry[] = [
  "Technology / SaaS",
  "Fintech",
  "E-commerce / D2C",
  "Healthcare / HealthTech",
  "Manufacturing",
  "Services / Consulting",
  "Media / Content",
  "Other",
];

// Indian states & UTs for jurisdiction / governing-law clauses.
export const STATES: string[] = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi (NCT)", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export interface CompanyData {
  legalName: string;
  brandName: string;
  entityType: EntityType;
  cin: string; // CIN / LLPIN / Registration no. (optional)
  industry: Industry;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
  website: string;
  signatoryName: string;
  signatoryDesignation: string;
  headcount: string; // approximate current team size (drives POSH ICC vs LCC)
  // Optional company logo (PNG/JPEG data URL) embedded into the document letterhead.
  logoDataUrl: string;
  logoW: number; // display width in px (scaled at upload)
  logoH: number; // display height in px
  // Optional context to pre-fill HR letters. Left as editable [brackets] if blank.
  candidateName: string;
  candidateRole: string;
  candidateCtc: string;
}

export function emptyCompany(): CompanyData {
  return {
    legalName: "",
    brandName: "",
    entityType: "Private Limited Company",
    cin: "",
    industry: "Technology / SaaS",
    address: "",
    city: "",
    state: "Karnataka",
    pincode: "",
    email: "",
    phone: "",
    website: "",
    signatoryName: "",
    signatoryDesignation: "Director",
    headcount: "1-9",
    logoDataUrl: "",
    logoW: 0,
    logoH: 0,
    candidateName: "",
    candidateRole: "",
    candidateCtc: "",
  };
}

// ---- Document content model ----------------------------------------------
// Templates emit a list of Blocks. The same block list is rendered to an HTML
// preview and to an editable .docx, so a template is written exactly once.

export type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "kv"; rows: [string, string][] } // label / value table
  | { type: "hr" }
  | { type: "sign"; left: string[]; right: string[] }
  | { type: "note"; text: string }; // small grey footnote / disclaimer

export type DocCategory =
  | "HR & Employee Contracts"
  | "Employee Policies"
  | "Company Legal Contracts"
  | "Compliance & Governance";

export interface DocumentDef {
  id: string;
  name: string;
  category: DocCategory;
  description: string;
  // Whether the doc only makes sense once a candidate/employee is named.
  needsCandidate?: boolean;
  build: (c: CompanyData) => Block[];
}
