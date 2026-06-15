import { CompanyData, Block } from "../types";

export function displayName(c: CompanyData): string {
  if (c.brandName && c.brandName !== c.legalName) {
    return `${c.legalName} ("${c.brandName}")`;
  }
  return c.legalName || "[Company Legal Name]";
}

export function shortName(c: CompanyData): string {
  return c.brandName || c.legalName || "the Company";
}

export function fullAddress(c: CompanyData): string {
  const parts = [c.address, c.city, c.state, c.pincode].filter(Boolean);
  return parts.length ? parts.join(", ") : "[Registered Office Address]";
}

export function regLine(c: CompanyData): string {
  const idLabel = c.entityType.includes("LLP") ? "LLPIN" : "CIN / Registration No.";
  const id = c.cin || "[__________]";
  return `${displayName(c)}, a ${c.entityType} incorporated under the laws of India, bearing ${idLabel} ${id}, having its registered office at ${fullAddress(c)} (hereinafter referred to as the "Company").`;
}

export function todayLong(): string {
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function governingLaw(c: CompanyData, n?: number): Block[] {
  const state = c.state || "[State]";
  const seat = c.city || "[City]";
  const heading = n ? `${n}. Governing Law & Dispute Resolution` : "Governing Law & Dispute Resolution";
  return [
    { type: "h2", text: heading },
    {
      type: "p",
      text: `This document shall be governed by and construed in accordance with the laws of India. Subject to the dispute-resolution provisions below, the courts at ${seat}, ${state} shall have exclusive jurisdiction over any dispute arising out of or in connection with this document.`,
    },
    {
      type: "p",
      text: `Any dispute, controversy or claim arising out of or relating to this document shall, as far as possible, be settled amicably. Failing amicable settlement within thirty (30) days, the dispute shall be referred to and finally resolved by arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be ${seat}, ${state}, and the proceedings shall be conducted in English.`,
    },
  ];
}

export function signCompanyEmployee(c: CompanyData, otherLabel = "Employee"): Block {
  return {
    type: "sign",
    left: [
      `For and on behalf of ${shortName(c)}`,
      "",
      "_______________________",
      c.signatoryName || "[Authorised Signatory]",
      c.signatoryDesignation || "[Designation]",
      `Date: ${todayLong()}`,
    ],
    right: [
      `Accepted by ${otherLabel}`,
      "",
      "_______________________",
      "Name: __________________",
      "Date: __________________",
      "Place: _________________",
    ],
  };
}
