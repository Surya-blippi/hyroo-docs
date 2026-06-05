import { CompanyData, DocumentDef, Block } from "../types";
import {
  displayName, shortName, fullAddress, todayLong, governingLaw,
  disclaimer, signCompanyEmployee,
} from "./shared";
import { industryDataClause } from "./industry";

const cand = (c: CompanyData) => c.candidateName || "[Employee Name]";
const role = (c: CompanyData) => c.candidateRole || "[Designation]";
const ctc = (c: CompanyData) => c.candidateCtc || "[Annual CTC in ₹]";

export const offerLetter: DocumentDef = {
  id: "offer-letter",
  name: "Offer Letter",
  category: "HR & Employee Contracts",
  description:
    "The first formal offer after selection — role, CTC, joining date, probation period and reporting structure.",
  needsCandidate: true,
  build: (c): Block[] => [
    { type: "h1", text: "Offer of Employment" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: `To,\n${cand(c)}` },
    { type: "p", text: `Dear ${cand(c)},` },
    {
      type: "p",
      text: `We are pleased to offer you the position of ${role(c)} with ${displayName(c)}. We were impressed with your background and believe you will be a valuable addition to our team.`,
    },
    { type: "h2", text: "Key Terms of the Offer" },
    {
      type: "kv",
      rows: [
        ["Designation", role(c)],
        ["Annual CTC", ctc(c)],
        ["Proposed Date of Joining", "[DD/MM/YYYY]"],
        ["Reporting To", "[Manager Name / Designation]"],
        ["Reporting Location", c.city || "[City]"],
        ["Probation Period", "Six (6) months from date of joining"],
        ["Notice Period", "30 days during probation, 60 days on confirmation"],
      ],
    },
    { type: "h2", text: "Conditions of this Offer" },
    {
      type: "ol",
      items: [
        "This offer is contingent upon satisfactory completion of background verification and reference checks.",
        "You confirm that you are not bound by any non-compete, confidentiality or other obligation that would conflict with your employment with the Company.",
        "You will be required to sign the Company's Employment Agreement, Non-Disclosure & Non-Compete Agreement, and acknowledge the Company's policies on or before your date of joining.",
        "You will furnish all documents required for onboarding, including identity and address proof (PAN, Aadhaar), educational and prior-employment records, and bank details for salary credit.",
      ],
    },
    {
      type: "p",
      text: `This offer is valid for seven (7) days from the date of this letter. Please confirm your acceptance by signing and returning a copy of this letter.`,
    },
    { type: "p", text: "We look forward to welcoming you aboard." },
    signCompanyEmployee(c, "Candidate"),
    disclaimer(),
  ],
};

export const employmentAgreement: DocumentDef = {
  id: "employment-agreement",
  name: "Employment Agreement",
  category: "HR & Employee Contracts",
  description:
    "The binding employment contract — duties, working hours, compensation, leave entitlement, confidentiality, IP and termination. Mandatory in writing under the Shops & Establishments Act.",
  needsCandidate: true,
  build: (c): Block[] => {
    const blocks: Block[] = [
      { type: "h1", text: "Employment Agreement" },
      { type: "p", text: `Date: ${todayLong()}` },
      {
        type: "p",
        text: `This Employment Agreement ("Agreement") is entered into between ${displayName(c)}, having its registered office at ${fullAddress(c)} (the "Company") and ${cand(c)} (the "Employee").`,
      },
      { type: "h2", text: "1. Appointment & Designation" },
      {
        type: "p",
        text: `The Company appoints the Employee to the position of ${role(c)}. The Employee shall perform the duties associated with this role and such other reasonable duties as may be assigned from time to time, and shall report to the manager designated by the Company.`,
      },
      { type: "h2", text: "2. Date of Joining & Probation" },
      {
        type: "p",
        text: "Employment commences on [DD/MM/YYYY]. The Employee shall be on probation for six (6) months, extendable at the Company's discretion. Confirmation will be communicated in writing; until confirmed, the Employee is deemed to be on probation.",
      },
      { type: "h2", text: "3. Compensation" },
      {
        type: "p",
        text: `The Employee shall be paid an annual cost-to-company of ${ctc(c)}, payable monthly, subject to applicable statutory deductions including TDS, Provident Fund and Professional Tax. A detailed salary structure is set out in Annexure A.`,
      },
      { type: "h2", text: "4. Working Hours" },
      {
        type: "p",
        text: "Standard working days and hours shall be as per the Company's policy and applicable Shops & Establishments rules. The Employee may be required to work additional hours as reasonably necessary to discharge their duties, without additional remuneration unless required by law.",
      },
      { type: "h2", text: "5. Leave Entitlement" },
      {
        type: "p",
        text: "The Employee shall be entitled to leave in accordance with the Company's Leave Policy and applicable law, including casual, sick and earned leave, public holidays, and statutory maternity / paternity benefits, as amended from time to time.",
      },
      { type: "h2", text: "6. Place of Work" },
      {
        type: "p",
        text: `The Employee's base location shall be ${c.city || "[City]"}. The Company may, with reasonable notice, require the Employee to work from any other location or in a hybrid/remote arrangement as business needs require.`,
      },
      { type: "h2", text: "7. Confidentiality & Intellectual Property" },
      {
        type: "p",
        text: "The Employee shall maintain strict confidentiality of all Confidential Information and shall execute the Company's Non-Disclosure & Non-Compete Agreement. All work product, inventions and intellectual property created in the course of employment shall vest exclusively in the Company.",
      },
    ];
    const dataClause = industryDataClause(c);
    if (dataClause) blocks.push({ type: "p", text: dataClause });
    blocks.push(
      { type: "h2", text: "8. Code of Conduct & Policies" },
      {
        type: "p",
        text: "The Employee shall comply with all Company policies, including the Code of Conduct, the Prevention of Sexual Harassment (POSH) Policy, the Leave Policy and the Performance Review Policy, as amended from time to time.",
      },
      { type: "h2", text: "9. Termination" },
      {
        type: "ul",
        items: [
          "Either party may terminate this Agreement by giving 30 days' notice during probation and 60 days' notice after confirmation, or salary in lieu thereof.",
          "The Company may terminate employment without notice for misconduct, breach of this Agreement, or unsatisfactory performance during probation.",
          "On termination, the Employee shall return all Company property, documents and Confidential Information, and complete exit formalities.",
        ],
      },
      { type: "h2", text: "10. Full & Final Settlement" },
      {
        type: "p",
        text: "Upon cessation of employment, dues shall be settled in the normal course after recovery of any amounts owed to the Company and completion of exit formalities, as set out in the Separation Agreement / Full and Final Settlement.",
      },
      ...governingLaw(c),
      { type: "h2", text: "Acceptance" },
      {
        type: "p",
        text: "The Employee confirms having read and understood this Agreement and accepts the terms herein.",
      },
      signCompanyEmployee(c, "Employee"),
      disclaimer(),
    );
    return blocks;
  },
};

export const probationConfirmation: DocumentDef = {
  id: "probation-confirmation",
  name: "Probation Confirmation Letter",
  category: "HR & Employee Contracts",
  description:
    "Formally confirms an employee into permanent employment after a successful probation period.",
  needsCandidate: true,
  build: (c): Block[] => [
    { type: "h1", text: "Confirmation of Employment" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: `To,\n${cand(c)}` },
    { type: "p", text: `Dear ${cand(c)},` },
    {
      type: "p",
      text: `We are pleased to inform you that, based on a review of your performance and conduct during your probation period as ${role(c)}, your services with ${displayName(c)} are hereby confirmed with effect from [DD/MM/YYYY]. You are now a permanent employee of the Company.`,
    },
    { type: "h2", text: "1. Terms on Confirmation" },
    {
      type: "ul",
      items: [
        "Your notice period now stands revised to sixty (60) days, as per your Employment Agreement.",
        "Your compensation and benefits continue as per your existing terms, save as separately communicated.",
        "You remain bound by the Company's policies and the Non-Disclosure & Non-Compete Agreement executed by you.",
      ],
    },
    { type: "h2", text: "2. Continued Expectations" },
    {
      type: "p",
      text: "We expect you to continue to uphold the standards of performance, professionalism and integrity that led to this confirmation. We look forward to your continued contribution and growth with the Company.",
    },
    { type: "p", text: "Congratulations, and welcome to the team on a permanent basis." },
    {
      type: "sign",
      left: [
        `For ${shortName(c)}`,
        "",
        "_______________________",
        c.signatoryName || "[Authorised Signatory]",
        c.signatoryDesignation || "[Designation]",
      ],
      right: [
        "Acknowledged by Employee",
        "",
        "_______________________",
        "Name: __________________",
        "Date: __________________",
      ],
    },
    disclaimer(),
  ],
};

export const separationAgreement: DocumentDef = {
  id: "separation-agreement",
  name: "Separation Agreement / Full & Final Settlement",
  category: "HR & Employee Contracts",
  description:
    "Documents an employee's exit — last working day, full and final dues, return of property, and surviving confidentiality obligations.",
  needsCandidate: true,
  build: (c): Block[] => [
    { type: "h1", text: "Separation Agreement & Full and Final Settlement" },
    { type: "p", text: `Date: ${todayLong()}` },
    {
      type: "p",
      text: `This Separation Agreement ("Agreement") is made between ${displayName(c)} (the "Company") and ${cand(c)} (the "Employee"), recording the terms of the Employee's separation from the Company.`,
    },
    { type: "h2", text: "1. Separation" },
    {
      type: "p",
      text: "The Employee's employment with the Company shall cease with effect from the close of business on [DD/MM/YYYY] (the \"Last Working Day\"), by way of [resignation / mutual separation]. The Employee's resignation, where applicable, is hereby accepted.",
    },
    { type: "h2", text: "2. Full & Final Settlement" },
    {
      type: "p",
      text: "The Company shall pay, or recover, the full and final settlement amount comprising salary up to the Last Working Day, encashment of accrued leave (if any), reimbursements, and statutory dues, less applicable deductions, recoveries, notice-period shortfall (if any) and any amounts owed by the Employee. The computation is set out in Annexure A.",
    },
    {
      type: "kv",
      rows: [
        ["Last Working Day", "[DD/MM/YYYY]"],
        ["Net F&F Amount Payable", "₹[__________]"],
        ["Payable By", "Within [45] days of the Last Working Day"],
      ],
    },
    { type: "h2", text: "3. Return of Company Property" },
    {
      type: "p",
      text: "On or before the Last Working Day, the Employee shall return all Company property in their possession, including laptops, access cards, devices, documents, data and all copies of Confidential Information.",
    },
    { type: "h2", text: "4. Surviving Obligations" },
    {
      type: "p",
      text: "The Employee's obligations of confidentiality, non-solicitation and intellectual-property assignment under the Non-Disclosure & Non-Compete Agreement and the Employment Agreement shall survive separation and continue to bind the Employee.",
    },
    { type: "h2", text: "5. Mutual Release" },
    {
      type: "p",
      text: "Upon receipt of the full and final settlement amount, each party releases the other from all claims arising out of the employment, save for the surviving obligations set out above and any statutory rights that cannot be waived.",
    },
    { type: "h2", text: "6. Confidentiality of Terms" },
    {
      type: "p",
      text: "The Employee shall keep the terms of this Agreement confidential and shall not make any disparaging statements about the Company.",
    },
    ...governingLaw(c),
    signCompanyEmployee(c, "Employee"),
    disclaimer(),
  ],
};
