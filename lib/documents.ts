import { DocumentDef, DocCategory } from "./types";
import {
  offerLetter, employmentAgreement, probationConfirmation, separationAgreement,
} from "./templates/hr";
import { poshPolicy, leavePolicy, codeOfConduct, performanceReviewPolicy } from "./templates/policies";
import {
  employeeNdaNonCompete, companyNda, consultantAgreement, vendorAgreement,
  marketingConsultantAgreement,
} from "./templates/agreements";

export const DOCUMENTS: DocumentDef[] = [
  // HR & Employee Contracts
  offerLetter,
  employmentAgreement,
  probationConfirmation,
  employeeNdaNonCompete,
  separationAgreement,
  // Employee Policies
  leavePolicy,
  codeOfConduct,
  performanceReviewPolicy,
  // Company Legal Contracts
  companyNda,
  consultantAgreement,
  marketingConsultantAgreement,
  vendorAgreement,
  // Compliance & Governance
  poshPolicy,
];

export const CATEGORY_ORDER: DocCategory[] = [
  "HR & Employee Contracts",
  "Employee Policies",
  "Company Legal Contracts",
  "Compliance & Governance",
];

export function getDocument(id: string): DocumentDef | undefined {
  return DOCUMENTS.find((d) => d.id === id);
}

export function documentsByCategory(): Record<DocCategory, DocumentDef[]> {
  const out = {
    "HR & Employee Contracts": [],
    "Employee Policies": [],
    "Company Legal Contracts": [],
    "Compliance & Governance": [],
  } as Record<DocCategory, DocumentDef[]>;
  for (const d of DOCUMENTS) out[d.category].push(d);
  return out;
}
