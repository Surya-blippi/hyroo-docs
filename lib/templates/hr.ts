import { CompanyData, DocumentDef, Block } from "../types";
import {
  displayName, shortName, fullAddress, todayLong, governingLaw,
  signCompanyEmployee,
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
    "The first formal offer after selection: role, CTC, joining date, probation period and reporting structure.",
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
  ],
};

export const employmentAgreement: DocumentDef = {
  id: "employment-agreement",
  name: "Employment Agreement",
  category: "HR & Employee Contracts",
  description:
    "The binding employment contract: duties, working hours, compensation, leave entitlement, confidentiality, IP and termination. Mandatory in writing under the Shops & Establishments Act.",
  needsCandidate: true,
  build: (c): Block[] => {
    const blocks: Block[] = [
      { type: "h1", text: "Employment Agreement" },
      { type: "p", text: `Date: ${todayLong()}` },
      {
        type: "p",
        text: `This Employment Agreement ("Agreement") is entered into between:\n\n${displayName(c)}, having its registered office at ${fullAddress(c)} (the "Company"); and\n${cand(c)} (the "Employee").\n\nTogether referred to as the "Parties". This Agreement sets out the terms and conditions of the Employee’s employment with the Company.`,
      },
      { type: "h2", text: "1. Appointment & Designation" },
      {
        type: "p",
        text: `The Company appoints the Employee to the position of ${role(c)}. The Employee shall perform the duties and responsibilities associated with this role, and such other reasonable duties as may be assigned from time to time. The Employee shall report to the manager or team lead designated by the Company.`,
      },
      { type: "h2", text: "2. Date of Joining & Probation" },
      {
        type: "p",
        text: "Employment commences on [DD/MM/YYYY]. The Employee shall serve a probationary period of six (6) months from the date of joining, extendable at the Company’s discretion. Confirmation of employment will be communicated in writing; until confirmed, the Employee shall be deemed to be on probation.",
      },
      {
        type: "p",
        text: "During probation, the Company may assess the Employee’s performance, attitude, and organisational fit, and may terminate employment as provided in Clause 10.",
      },
      { type: "h2", text: "3. Compensation" },
      {
        type: "p",
        text: `The Employee shall receive an annual cost-to-company (CTC) of ${ctc(c)}, payable monthly, subject to applicable statutory deductions including TDS, Provident Fund (PF), and Professional Tax. The detailed salary structure is set out in Annexure A to this Agreement.`,
      },
      {
        type: "p",
        text: "Any revision in compensation shall be communicated in writing and shall not require a formal amendment to this Agreement.",
      },
      { type: "h2", text: "4. Working Hours & Flexibility" },
      {
        type: "p",
        text: `${shortName(c)} values outcomes and trust over rigid hours. The working-time expectations are set out below.`,
      },
      { type: "h3", text: "Standard Hours" },
      {
        type: "p",
        text: "The standard work week is Monday to Friday. Core working hours are 10:00 AM to 6:00 PM, with a reasonable lunch break. The Employee is expected to be available and reachable during core hours on working days.",
      },
      { type: "h3", text: "Extended Hours" },
      {
        type: "p",
        text: "There will be occasions, such as launches, deadlines or live campaigns, where additional effort is required. The Company appreciates the Employee's commitment during such periods and will seek to balance the workload fairly.",
      },
      { type: "h2", text: "5. Leave Entitlement" },
      {
        type: "p",
        text: "The Employee shall be entitled to leave in accordance with the Company’s Leave Policy and applicable law, including:",
      },
      {
        type: "ul",
        items: [
          "Casual Leave (CL)",
          "Sick Leave (SL)",
          "Earned / Privilege Leave (PL/EL)",
          "Public and National Holidays as declared by the Company each year",
          "Statutory Maternity / Paternity benefits as per applicable law",
        ],
      },
      {
        type: "p",
        text: "The Leave Policy will be shared upon joining and may be updated from time to time. Leave accrual, carry-forward, and encashment shall be as per the applicable policy.",
      },
      { type: "h2", text: "6. Place of Work" },
      {
        type: "p",
        text: `The Employee’s primary base location shall be ${c.city || "[City]"}. The Company may, with reasonable prior notice, require the Employee to work from a different location, at client premises, or under a hybrid or remote arrangement, based on evolving business requirements. Any such change will be discussed and communicated in writing.`,
      },
      { type: "h2", text: "7. Confidentiality & Intellectual Property" },
      {
        type: "p",
        text: 'The Employee shall maintain strict confidentiality of all Confidential Information belonging to the Company, its clients and partners, during employment and after its cessation. "Confidential Information" includes, without limitation, business plans, client data, pricing, strategies, technology, and internal communications.',
      },
      {
        type: "p",
        text: "All work product, inventions, designs, code, content and intellectual property created in the course of employment, whether or not during working hours or using Company equipment, shall vest exclusively in the Company. The Employee may also be required to execute a separate Non-Disclosure & Non-Compete Agreement.",
      },
    ];
    const dataClause = industryDataClause(c);
    if (dataClause) blocks.push({ type: "p", text: dataClause });
    blocks.push(
      { type: "h2", text: "8. Code of Conduct & Policies" },
      {
        type: "p",
        text: "The Employee agrees to comply with all Company policies, as updated from time to time, including:",
      },
      {
        type: "ul",
        items: [
          "Code of Conduct",
          "Prevention of Sexual Harassment (POSH) Policy",
          "Leave Policy",
          "Performance Review Policy",
          "Data Protection & Information Security Policy",
          "Social Media & Communication Policy",
        ],
      },
      {
        type: "p",
        text: "Copies of all policies will be provided upon joining. Non-compliance may result in disciplinary action, up to and including termination.",
      },
      { type: "h2", text: "9. Performance Reviews" },
      {
        type: "p",
        text: "The Company believes in honest, constructive conversations about performance. The Employee’s performance will be reviewed at least once a year against mutually agreed goals and KPIs. Reviews may inform decisions on confirmation, increments, role changes, or career progression. The Employee is encouraged to actively engage in goal-setting and two-way feedback.",
      },
      { type: "h2", text: "10. Termination" },
      {
        type: "p",
        text: "Either party may terminate this Agreement by giving 30 days’ written notice during probation and 60 days’ written notice after confirmation, or by paying salary in lieu of notice.",
      },
      {
        type: "p",
        text: "The Company may terminate without notice or payment in lieu in cases of gross misconduct, fraud, serious breach of this Agreement, or persistent unsatisfactory performance during probation.",
      },
      {
        type: "p",
        text: "During the notice period, the Employee shall continue to discharge duties diligently and cooperate fully with handover and transition of work.",
      },
      {
        type: "p",
        text: "Upon cessation, the Employee shall promptly return all Company property, devices, documents, data, credentials, and Confidential Information, and complete exit formalities as directed.",
      },
      { type: "h2", text: "11. Full & Final Settlement" },
      {
        type: "p",
        text: "Upon cessation of employment, the Company shall process the Employee’s full and final settlement, covering unpaid salary, leave encashment (as applicable), and any other statutory dues. Settlement shall be completed after deducting amounts owed by the Employee and upon satisfactory completion of exit formalities, as set out in the F&F Settlement Form.",
      },
      { type: "h2", text: "12. Non-Solicitation" },
      {
        type: "p",
        text: "During employment and for 12 (twelve) months after cessation, the Employee agrees not to directly or indirectly solicit any client, customer, employee, or contractor of the Company for a competing purpose or personal benefit, without prior written consent from the Company.",
      },
      { type: "h2", text: "13. Governing Law & Dispute Resolution" },
      {
        type: "p",
        text: `This Agreement shall be governed by the laws of India. The courts at ${c.city || "[City]"} shall have exclusive jurisdiction over disputes arising out of this Agreement, subject to the arbitration provisions below.`,
      },
      {
        type: "p",
        text: "Any dispute shall first be resolved through good-faith discussion. If unresolved within 30 days, it shall be referred to arbitration before a sole arbitrator under the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be as agreed by the Parties, and proceedings shall be conducted in English.",
      },
      { type: "h2", text: "Acceptance" },
      {
        type: "p",
        text: "The Employee confirms having read, understood, and agreed to all terms of this Agreement, and accepts employment on the terms set out herein.",
      },
      signCompanyEmployee(c, "Employee"),
      { type: "hr" },
      { type: "h1", text: "ANNEXURE A" },
      { type: "h2", text: "Salary Structure & Compensation Breakup" },
      {
        type: "kv",
        rows: [
          ["Employee Name", cand(c)],
          ["Designation", role(c)],
          ["Date of Joining", "[DD/MM/YYYY]"],
          ["Effective Date of This Structure", "[DD/MM/YYYY]"],
        ],
      },
      {
        type: "table",
        headers: ["Salary Component", "Monthly (₹)", "Annual (₹)", "Notes"],
        rows: [
          ["Basic Salary", "[Amount]", "[Amount]", "40-50% of Gross"],
          ["House Rent Allowance (HRA)", "[Amount]", "[Amount]", "40-50% of Basic"],
          ["Special / Flexible Allowance", "[Amount]", "[Amount]", "Balancing component"],
          ["Medical Allowance", "[Amount]", "[Amount]", "As per policy"],
          ["Other Allowances (LTA, Travel)", "[Amount]", "[Amount]", "As applicable"],
          ["Gross Salary (A)", "[Amount]", "[Amount]", ""],
          ["Employer PF Contribution", "[Amount]", "[Amount]", "12% of Basic"],
          ["Employer ESIC Contribution", "[Amount]", "[Amount]", "If applicable"],
          ["Gratuity Provision", "[Amount]", "[Amount]", "4.81% of Basic"],
          ["Total Cost to Company (CTC)", "[Amount]", "[Amount]", "Annual CTC"],
        ],
      },
      {
        type: "ul",
        items: [
          "All figures are in Indian Rupees (₹) and are subject to applicable statutory deductions.",
          "TDS shall be deducted as per the income tax slab declared by the Employee at the start of each financial year.",
          "PF contributions shall be per the Employees’ Provident Funds & Miscellaneous Provisions Act, 1952.",
          "HRA exemption is subject to conditions under Section 10(13A) of the Income Tax Act, 1961.",
          "This salary structure may be revised at the time of performance review or by mutual written agreement.",
          "This Annexure forms an integral part of the Employment Agreement and is subject to all its terms.",
        ],
      },
      {
        type: "sign",
        left: [
          `For and on behalf of ${shortName(c)}`,
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
  ],
};

export const separationAgreement: DocumentDef = {
  id: "separation-agreement",
  name: "Separation Agreement / Full & Final Settlement",
  category: "HR & Employee Contracts",
  description:
    "Documents an employee's exit: last working day, full and final dues, return of property, and surviving confidentiality obligations.",
  needsCandidate: true,
  build: (c): Block[] => [
    { type: "h1", text: "Separation Agreement & Full and Final Settlement" },
    { type: "p", text: `Date: ${todayLong()}` },
    {
      type: "p",
      text: `This Separation Agreement (this "Agreement") is made on the date stated above between ${displayName(c)} (the "Company") and ${cand(c)}, residing at [Address] (the "Employee"), recording the terms of the Employee's separation from the Company. The Company and the Employee are referred to individually as a "Party" and collectively as the "Parties".`,
    },

    { type: "h2", text: "Recitals" },
    {
      type: "p",
      text: `The Employee was employed by the Company in the role of ${role(c)} with effect from [DD/MM/YYYY]. The Parties have agreed to part ways and wish to record, in a full and final manner, the terms governing the cessation of employment and the settlement of all dues, on the terms set out below.`,
    },

    { type: "h2", text: "1. Separation" },
    {
      type: "p",
      text: 'The Employee\'s employment with the Company shall cease with effect from the close of business on [DD/MM/YYYY] (the "Last Working Day"), by way of [resignation / mutual separation / as applicable]. Where applicable, the Employee\'s resignation is hereby accepted by the Company. The Employee shall cease to hold any office, directorship or position held by virtue of the employment with effect from the Last Working Day.',
    },

    { type: "h2", text: "2. Full & Final Settlement" },
    {
      type: "p",
      text: "The Company shall pay to, or recover from, the Employee the full and final settlement amount, comprising salary up to the Last Working Day, encashment of accrued and unused leave (if any), approved reimbursements, and statutory dues, less applicable deductions, recoveries, notice-period shortfall (if any) and any amounts owed by the Employee to the Company. The detailed computation is set out in Annexure A.",
    },
    {
      type: "kv",
      rows: [
        ["Last Working Day", "[DD/MM/YYYY]"],
        ["Net F&F Amount Payable", "₹[__________]"],
        ["Payable By", "Within [45] days of the Last Working Day"],
        ["Mode of Payment", "[Bank transfer to registered account]"],
      ],
    },

    { type: "h2", text: "3. Return of Company Property" },
    {
      type: "p",
      text: "On or before the Last Working Day, the Employee shall return to the Company all property in their possession or control, including laptops, mobile devices, access cards, keys, equipment, documents, records, data and all copies of Confidential Information, whether in physical or electronic form, and shall delete any Company data held on personal devices or accounts.",
    },

    { type: "h2", text: "4. Surviving Obligations" },
    {
      type: "p",
      text: "The Employee's obligations of confidentiality, non-solicitation, non-disparagement and intellectual-property assignment under the Non-Disclosure & Non-Compete Agreement and the Employment Agreement shall survive the separation and continue to bind the Employee in accordance with their terms. The Employee reaffirms these obligations as of the Last Working Day.",
    },

    { type: "h2", text: "5. Non-Solicitation" },
    {
      type: "p",
      text: "For a period of [twelve (12)] month(s) following the Last Working Day, the Employee shall not, directly or indirectly, solicit or attempt to solicit any employee, client or customer of the Company with whom the Employee had dealings during employment, for the purpose of competing with the Company, to the extent permitted by applicable law.",
    },

    { type: "h2", text: "6. Mutual Release" },
    {
      type: "p",
      text: "Upon receipt of the full and final settlement amount, each Party releases and forever discharges the other from all claims, demands and liabilities arising out of or in connection with the employment or its cessation, save for (a) the surviving obligations set out above, (b) the obligations created by this Agreement, and (c) any statutory rights or entitlements that cannot be waived under applicable law.",
    },

    { type: "h2", text: "7. Confidentiality of Terms & Non-Disparagement" },
    {
      type: "p",
      text: "The Employee shall keep the terms of this Agreement confidential, save where disclosure is required by law or to professional advisers bound by confidentiality. Neither Party shall make, publish or communicate any disparaging or defamatory statement about the other, and the Employee shall not make any such statement about the Company's directors, employees, products or services.",
    },

    { type: "h2", text: "8. Cooperation" },
    {
      type: "p",
      text: "Following the Last Working Day, the Employee shall provide reasonable cooperation and a smooth handover of work, responsibilities and knowledge, and shall, on reasonable request, assist the Company in relation to any matter in which the Employee was involved during employment.",
    },

    { type: "h2", text: "9. Taxes" },
    {
      type: "p",
      text: "All payments under this Agreement are subject to deduction of tax at source and other statutory deductions as required under applicable law. The Employee shall be responsible for their own tax liabilities arising from the settlement.",
    },

    { type: "h2", text: "10. Entire Agreement & Severability" },
    {
      type: "p",
      text: "This Agreement, together with the surviving obligations referenced above, constitutes the entire understanding between the Parties on its subject matter and supersedes all prior discussions and arrangements. If any provision is held invalid or unenforceable, the remaining provisions shall continue in full force and effect. No amendment is effective unless made in writing and signed by both Parties.",
    },

    ...governingLaw(c, 11),

    { type: "h2", text: "12. Acknowledgement" },
    {
      type: "p",
      text: "The Employee confirms that they have read and understood this Agreement, have had the opportunity to seek independent advice, and are entering into it voluntarily and without coercion, and that the full and final settlement is accepted in complete satisfaction of all claims against the Company arising from the employment.",
    },
    signCompanyEmployee(c, "Employee"),

    { type: "hr" },
    { type: "h1", text: "ANNEXURE A" },
    { type: "h2", text: "Full & Final Settlement Computation" },
    {
      type: "table",
      headers: ["Component", "Amount (₹)"],
      rows: [
        ["Salary up to Last Working Day", "[__________]"],
        ["Leave Encashment (if any)", "[__________]"],
        ["Reimbursements", "[__________]"],
        ["Statutory Dues / Other", "[__________]"],
        ["Less: Deductions / Recoveries", "([________])"],
        ["Less: Notice-Period Shortfall (if any)", "([________])"],
        ["Net Amount Payable", "[__________]"],
      ],
    },
  ],
};
