import { CompanyData, DocumentDef, Block } from "../types";
import {
  displayName, shortName, regLine, todayLong, governingLaw,
  disclaimer, signCompanyEmployee,
} from "./shared";
import { industryConfidentialityNote, industryDataClause } from "./industry";

export const employeeNdaNonCompete: DocumentDef = {
  id: "employee-nda-noncompete",
  name: "Non-Disclosure & Non-Compete Agreement (Employee)",
  category: "HR & Employee Contracts",
  description:
    "Protects confidential client, customer and business information, assigns IP to the company, and sets non-compete and non-solicitation obligations.",
  build: (c): Block[] => {
    const blocks: Block[] = [
      { type: "h1", text: "Non-Disclosure & Non-Compete Agreement" },
      { type: "p", text: `Date: ${todayLong()}` },
      { type: "p", text: `This Agreement is entered into between:` },
      { type: "p", text: regLine(c) },
      {
        type: "p",
        text: `AND [Employee Name], residing at [Address] (the "Employee"). The Company and the Employee are individually a "Party" and collectively the "Parties".`,
      },
      { type: "h2", text: "1. Confidential Information" },
      {
        type: "p",
        text: `"Confidential Information" means all non-public information disclosed by or on behalf of the Company, whether oral, written or electronic, including business and growth strategy, finances, customer, client and end-user data, pricing, source code, designs, know-how, trade secrets and any information marked confidential or that a reasonable person would understand to be confidential.`,
      },
    ];
    const note = industryConfidentialityNote(c);
    if (note) blocks.push({ type: "p", text: note });
    blocks.push(
      { type: "h2", text: "2. Obligations of the Employee" },
      {
        type: "ul",
        items: [
          "Hold all Confidential Information in strict confidence and use it solely for performing duties for the Company;",
          "Not disclose Confidential Information to any third party without prior written consent;",
          "Protect Confidential Information using at least the same degree of care used for the Employee's own confidential information;",
          "Return or destroy all Confidential Information upon cessation of employment or on request.",
        ],
      },
      { type: "h2", text: "3. Intellectual Property Assignment" },
      {
        type: "p",
        text: "All inventions, works, software, designs, content and other intellectual property conceived, created or developed by the Employee, alone or with others, in the course of or in connection with employment (\"Work Product\"), shall be the sole and exclusive property of the Company. The Employee hereby irrevocably assigns to the Company all right, title and interest in such Work Product, including all intellectual property rights, and waives all moral rights to the extent permitted by law.",
      },
    );
    const dataClause = industryDataClause(c);
    if (dataClause) {
      blocks.push({ type: "h2", text: "4. Data Protection" }, { type: "p", text: dataClause });
    }
    const n = dataClause ? 1 : 0;
    blocks.push(
      { type: "h2", text: `${4 + n}. Non-Compete (During Employment)` },
      {
        type: "p",
        text: "During the term of employment, the Employee shall not, directly or indirectly, engage in, be employed by, advise or hold a material interest in any business that competes with the Company, nor undertake any activity that conflicts with the Employee's duties to the Company.",
      },
      { type: "h2", text: `${5 + n}. Non-Solicitation (Post-Employment)` },
      {
        type: "p",
        text: "During employment and for twelve (12) months thereafter, the Employee shall not solicit the Company's employees, customers, clients or vendors for any competing purpose. (Note: under Section 27 of the Indian Contract Act, 1872, post-employment non-compete restraints are generally unenforceable in India; confidentiality and non-solicitation obligations are more readily enforced and are the primary post-employment protections relied upon here.)",
      },
      { type: "h2", text: `${6 + n}. Term & Survival` },
      {
        type: "p",
        text: "The confidentiality and IP obligations under this Agreement shall survive the termination of employment and continue indefinitely with respect to trade secrets, and for five (5) years with respect to other Confidential Information.",
      },
      { type: "h2", text: `${7 + n}. Remedies` },
      {
        type: "p",
        text: "The Employee acknowledges that breach may cause irreparable harm for which damages may be inadequate, and that the Company shall be entitled to seek injunctive relief in addition to any other remedy.",
      },
      ...governingLaw(c),
      signCompanyEmployee(c, "Employee"),
      disclaimer(),
    );
    return blocks;
  },
};

export const companyNda: DocumentDef = {
  id: "company-nda",
  name: "Non-Disclosure Agreement (NDA)",
  category: "Company Legal Contracts",
  description:
    "A confidentiality agreement (mutual or one-way) for vendor discussions, partnerships and investor conversations.",
  build: (c): Block[] => [
    { type: "h1", text: "Non-Disclosure Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: `This Non-Disclosure Agreement ("Agreement") is entered into between:` },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Counterparty Name], a [entity type] having its office at [Address] (the "Counterparty"). This Agreement may be used on a mutual basis or, where only the Company discloses, on a one-way basis; in either case each party may act as a "Disclosing Party" or "Receiving Party".`,
    },
    { type: "h2", text: "1. Purpose" },
    {
      type: "p",
      text: "The Parties wish to explore a potential business relationship, such as a vendor engagement, partnership or investment (the \"Purpose\"), and, in connection with the Purpose, may disclose Confidential Information to each other.",
    },
    { type: "h2", text: "2. Confidential Information" },
    {
      type: "p",
      text: "\"Confidential Information\" means any non-public information disclosed by a Party, in any form, that is designated confidential or that a reasonable person would understand to be confidential, including business, technical, financial and commercial information.",
    },
    { type: "h2", text: "3. Exclusions" },
    {
      type: "ul",
      items: [
        "Information that is or becomes publicly available without breach;",
        "Information already known to the Receiving Party without obligation of confidence;",
        "Information independently developed without use of the Disclosing Party's information;",
        "Information rightfully received from a third party without restriction.",
      ],
    },
    { type: "h2", text: "4. Obligations" },
    {
      type: "p",
      text: "The Receiving Party shall use Confidential Information solely for the Purpose, not disclose it to third parties except to representatives with a need to know who are bound by similar obligations, and protect it with reasonable care.",
    },
    { type: "h2", text: "5. Term" },
    {
      type: "p",
      text: "This Agreement remains in force for two (2) years, and confidentiality obligations survive for a further three (3) years from disclosure.",
    },
    { type: "h2", text: "6. No Licence / No Obligation" },
    {
      type: "p",
      text: "Nothing herein grants any licence or intellectual-property right, nor obligates either Party to proceed with any transaction.",
    },
    ...governingLaw(c),
    {
      type: "sign",
      left: [
        `For ${shortName(c)}`,
        "",
        "_______________________",
        c.signatoryName || "[Authorised Signatory]",
        c.signatoryDesignation || "[Designation]",
        `Date: ${todayLong()}`,
      ],
      right: [
        "For the Counterparty",
        "",
        "_______________________",
        "Name: __________________",
        "Designation: ____________",
        "Date: __________________",
      ],
    },
    disclaimer(),
  ],
};

export const consultantAgreement: DocumentDef = {
  id: "consultant-agreement",
  name: "Consultant / Freelancer Agreement",
  category: "Company Legal Contracts",
  description:
    "Engages independent contractors with clear scope of work, fees, IP ownership, confidentiality and termination.",
  build: (c): Block[] => [
    { type: "h1", text: "Consulting / Independent Contractor Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Consultant Name], [PAN: ______], having address at [Address] (the "Consultant").`,
    },
    { type: "h2", text: "1. Services" },
    {
      type: "p",
      text: "The Consultant shall provide the services described in Annexure A (\"Services\") with due skill, care and diligence, and within the agreed timelines.",
    },
    { type: "h2", text: "2. Independent Contractor" },
    {
      type: "p",
      text: "The Consultant is an independent contractor and not an employee, agent or partner of the Company. Nothing herein creates an employment relationship, and the Consultant is responsible for their own taxes and statutory obligations.",
    },
    { type: "h2", text: "3. Fees & Payment" },
    {
      type: "p",
      text: "The Company shall pay the Consultant ₹[______] [per month / per deliverable], within [15] days of receipt of a valid invoice, subject to deduction of TDS as applicable. The Consultant shall be responsible for GST compliance where applicable.",
    },
    { type: "h2", text: "4. Intellectual Property" },
    {
      type: "p",
      text: "All deliverables and work product created under this Agreement shall, upon full payment, be the exclusive property of the Company, and the Consultant hereby assigns all right, title and interest therein to the Company. The Consultant warrants that the deliverables will not infringe any third-party rights.",
    },
    { type: "h2", text: "5. Confidentiality" },
    {
      type: "p",
      text: "The Consultant shall keep all Confidential Information confidential during and after the term, and shall not use it except to perform the Services.",
    },
    { type: "h2", text: "6. Term & Termination" },
    {
      type: "p",
      text: "This Agreement continues until the Services are completed or until terminated by either Party on fifteen (15) days' written notice. The Company may terminate immediately for material breach. Accrued fees for work properly performed shall be paid on termination.",
    },
    ...governingLaw(c),
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
        "Consultant",
        "",
        "_______________________",
        "Name: __________________",
        "Date: __________________",
      ],
    },
    disclaimer(),
  ],
};

export const vendorAgreement: DocumentDef = {
  id: "vendor-agreement",
  name: "Vendor / Service Provider Agreement",
  category: "Company Legal Contracts",
  description:
    "Engages agencies, software tools, production houses and other vendors: scope, fees, service levels, confidentiality and liability.",
  build: (c): Block[] => [
    { type: "h1", text: "Vendor / Service Provider Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Vendor Name], a [entity type] having its registered office at [Address], [GSTIN: ______] (the "Vendor"). The Company and the Vendor are each a "Party".`,
    },
    { type: "h2", text: "1. Scope of Services" },
    {
      type: "p",
      text: "The Vendor shall provide the goods and/or services described in Annexure A (\"Services\") in a professional and workmanlike manner, meeting the specifications, timelines and service levels set out therein.",
    },
    { type: "h2", text: "2. Fees, Invoicing & Taxes" },
    {
      type: "p",
      text: "The Company shall pay the fees set out in Annexure A within [30] days of receipt of a valid, undisputed invoice. Fees are exclusive of GST, which shall be charged as applicable. The Company may deduct TDS as required by law.",
    },
    { type: "h2", text: "3. Service Levels & Acceptance" },
    {
      type: "p",
      text: "The Vendor shall meet the agreed service levels. Deliverables are subject to the Company's acceptance; the Company may reject deliverables that do not conform to specifications, and the Vendor shall remedy them at no additional cost.",
    },
    { type: "h2", text: "4. Confidentiality & Data Protection" },
    {
      type: "p",
      text: "The Vendor shall keep all Confidential Information of the Company confidential, and shall process any personal data shared by the Company solely to provide the Services and in compliance with the Digital Personal Data Protection Act, 2023 and the Company's instructions.",
    },
    { type: "h2", text: "5. Intellectual Property" },
    {
      type: "p",
      text: "All deliverables created specifically for the Company under this Agreement shall, upon full payment, vest in the Company. The Vendor retains ownership of its pre-existing materials and tools, and grants the Company a licence to use them as necessary to enjoy the Services.",
    },
    { type: "h2", text: "6. Warranties & Indemnity" },
    {
      type: "p",
      text: "The Vendor warrants that it has the right and capability to provide the Services and that the Services and deliverables will not infringe any third-party rights. The Vendor shall indemnify the Company against losses arising from breach of this Agreement or its negligence or wilful misconduct.",
    },
    { type: "h2", text: "7. Limitation of Liability" },
    {
      type: "p",
      text: "Save for breaches of confidentiality, infringement and indemnity obligations, each Party's aggregate liability shall not exceed the fees paid under this Agreement in the twelve (12) months preceding the claim.",
    },
    { type: "h2", text: "8. Term & Termination" },
    {
      type: "p",
      text: "This Agreement continues for the term in Annexure A and may be terminated by either Party on thirty (30) days' written notice, or immediately for material breach not cured within fifteen (15) days. On termination, the Vendor shall hand over completed deliverables for which payment has been made.",
    },
    ...governingLaw(c),
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
        "For the Vendor",
        "",
        "_______________________",
        "Name: __________________",
        "Date: __________________",
      ],
    },
    disclaimer(),
  ],
};
