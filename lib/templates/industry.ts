import { CompanyData, Industry } from "../types";

// Industry-aware clause snippets. Kept light but real - these inject the most
// relevant compliance/confidentiality language for the selected industry.

export function industryConfidentialityNote(c: CompanyData): string | null {
  const map: Partial<Record<Industry, string>> = {
    Fintech:
      "Given the Company operates in financial services, Confidential Information expressly includes customer financial data, transaction records, KYC/AML documentation and any information governed by RBI directions or the Digital Personal Data Protection Act, 2023.",
    "Healthcare / HealthTech":
      "Given the Company operates in healthcare, Confidential Information expressly includes patient records, health and diagnostic data, and any sensitive personal data protected under the Digital Personal Data Protection Act, 2023 and applicable medical-records regulations.",
    "Technology / SaaS":
      "Confidential Information expressly includes source code, system architecture, algorithms, datasets, API keys, infrastructure credentials and product roadmaps.",
    "E-commerce / D2C":
      "Confidential Information expressly includes customer lists, order and payment data, supplier and pricing terms, and marketing performance data.",
  };
  return map[c.industry] ?? null;
}

export function industryDataClause(c: CompanyData): string | null {
  switch (c.industry) {
    case "Fintech":
    case "Healthcare / HealthTech":
      return "The Employee/Consultant shall handle all personal and sensitive personal data strictly in accordance with the Digital Personal Data Protection Act, 2023 and the Company's data-protection policies, and shall not transfer, copy or process such data except as necessary to perform their duties.";
    case "Technology / SaaS":
    case "E-commerce / D2C":
      return "The Employee/Consultant shall comply with the Digital Personal Data Protection Act, 2023 and the Company's information-security policies when handling any personal data of users or customers.";
    default:
      return null;
  }
}
