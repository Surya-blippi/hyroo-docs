import { CompanyData, DocumentDef, Block } from "../types";
import {
  displayName, shortName, regLine, todayLong, governingLaw,
  signCompanyEmployee,
} from "./shared";
import { industryConfidentialityNote, industryDataClause } from "./industry";

// Shared "General" boilerplate used by the contract templates.
function generalClause(n: number): Block[] {
  return [
    { type: "h2", text: `${n}. General` },
    {
      type: "ul",
      items: [
        "Notices: any notice under this Agreement shall be in writing and sent to the address or email of the relevant Party stated above or as otherwise notified.",
        "Entire Agreement: this Agreement constitutes the entire understanding between the Parties on its subject matter and supersedes all prior discussions and agreements.",
        "Amendment & Waiver: no amendment or waiver is effective unless made in writing and signed by both Parties. No failure to exercise a right operates as a waiver of it.",
        "Severability: if any provision is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
        "Assignment: neither Party may assign this Agreement without the prior written consent of the other, save to a successor of its business.",
        "Counterparts: this Agreement may be executed in counterparts, including by electronic signature, each of which is deemed an original.",
      ],
    },
  ];
}

function twoPartySign(c: CompanyData, otherLabel: string): Block {
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
      `For ${otherLabel}`,
      "",
      "_______________________",
      "Name: __________________",
      "Designation: ____________",
      "Date: __________________",
    ],
  };
}

export const employeeNdaNonCompete: DocumentDef = {
  id: "employee-nda-noncompete",
  name: "Non-Disclosure & Non-Compete Agreement (Employee)",
  category: "HR & Employee Contracts",
  description:
    "Protects confidential client, customer and business information, assigns IP to the company, and sets non-compete and non-solicitation obligations.",
  build: (c): Block[] => {
    const note = industryConfidentialityNote(c);
    const dataClause =
      industryDataClause(c) ||
      "The Employee shall handle all personal data of the Company, its employees, clients and customers strictly in accordance with the Digital Personal Data Protection Act, 2023 and the Company's information-security and data-protection policies, and shall not transfer, copy or process such data except as necessary to perform their duties.";

    return [
      { type: "h1", text: "Non-Disclosure & Non-Compete Agreement" },
      { type: "p", text: `Date: ${todayLong()}` },
      { type: "p", text: "This Agreement is entered into between:" },
      { type: "p", text: regLine(c) },
      {
        type: "p",
        text: `AND [Employee Name], residing at [Address] (the "Employee"). The Company and the Employee are referred to individually as a "Party" and collectively as the "Parties".`,
      },

      { type: "h2", text: "1. Confidential Information" },
      {
        type: "p",
        text: `"Confidential Information" means all non-public information disclosed by or on behalf of the Company, whether oral, written or electronic, including business and growth strategy, finances, customer, client and end-user data, pricing, source code, designs, know-how, trade secrets, and any information marked confidential or that a reasonable person would understand to be confidential.`,
      },
      ...(note ? [{ type: "p", text: note } as Block] : []),

      { type: "h2", text: "2. Obligations of the Employee" },
      {
        type: "ul",
        items: [
          "Hold all Confidential Information in strict confidence and use it solely for performing duties for the Company;",
          "Not disclose Confidential Information to any third party without prior written consent;",
          "Protect Confidential Information using at least the same degree of care used for the Employee's own confidential information, and in no event less than a reasonable degree of care;",
          "Promptly notify the Company of any actual or suspected unauthorised use or disclosure; and",
          "Return or destroy all Confidential Information upon cessation of employment or on request.",
        ],
      },

      { type: "h2", text: "3. Intellectual Property Assignment" },
      {
        type: "p",
        text: "All inventions, works, software, designs, content and other intellectual property conceived, created or developed by the Employee, alone or with others, in the course of or in connection with employment (\"Work Product\"), shall be the sole and exclusive property of the Company. The Employee hereby irrevocably assigns to the Company all right, title and interest in such Work Product, including all intellectual property rights, and waives all moral rights to the extent permitted by law. The Employee shall, at the Company's expense, do all things reasonably necessary to perfect the Company's ownership.",
      },

      { type: "h2", text: "4. Data Protection" },
      { type: "p", text: dataClause },

      { type: "h2", text: "5. Non-Compete (During Employment)" },
      {
        type: "p",
        text: "During the term of employment, the Employee shall not, directly or indirectly, engage in, be employed by, advise or hold a material interest in any business that competes with the Company, nor undertake any activity that conflicts with the Employee's duties to the Company, without the Company's prior written consent.",
      },

      { type: "h2", text: "6. Non-Solicitation (Post-Employment)" },
      {
        type: "p",
        text: "During employment and for twelve (12) months thereafter, the Employee shall not, directly or indirectly, solicit the Company's employees, customers, clients or vendors for any competing purpose. (Note: under Section 27 of the Indian Contract Act, 1872, post-employment non-compete restraints are generally unenforceable in India; confidentiality and non-solicitation obligations are more readily enforced and are the primary post-employment protections relied upon here.)",
      },

      { type: "h2", text: "7. Compelled Disclosure" },
      {
        type: "p",
        text: "If the Employee is required by law or a competent authority to disclose any Confidential Information, the Employee shall, to the extent legally permitted, give the Company prompt prior written notice and disclose only that portion of the Confidential Information that is legally required.",
      },

      { type: "h2", text: "8. Term & Survival" },
      {
        type: "p",
        text: "The confidentiality and intellectual-property obligations under this Agreement shall survive the termination of employment and continue indefinitely with respect to trade secrets, and for five (5) years with respect to other Confidential Information.",
      },

      { type: "h2", text: "9. Remedies" },
      {
        type: "p",
        text: "The Employee acknowledges that a breach of this Agreement may cause irreparable harm for which monetary damages may be inadequate, and that the Company shall be entitled to seek injunctive or other equitable relief, in addition to any other remedy available at law.",
      },

      ...governingLaw(c, 10),
      { type: "h2", text: "Acceptance" },
      {
        type: "p",
        text: "The Employee confirms having read and understood this Agreement and agrees to be bound by its terms.",
      },
      signCompanyEmployee(c, "Employee"),
    ];
  },
};

export const companyNda: DocumentDef = {
  id: "company-nda",
  name: "Non-Disclosure Agreement (NDA)",
  category: "Company Legal Contracts",
  description:
    "A confidentiality agreement (mutual or one-way) for vendor discussions, partnerships, collaborations and investor conversations.",
  build: (c): Block[] => [
    { type: "h1", text: "Non-Disclosure Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    {
      type: "p",
      text: `This Non-Disclosure Agreement (this "Agreement") is entered into on the date stated above (the "Effective Date") between:`,
    },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Counterparty Name], a [entity type] having its office at [Address] (the "Counterparty"). The Company and the Counterparty are referred to individually as a "Party" and collectively as the "Parties". This Agreement may be used on a mutual basis or, where only the Company discloses, on a one-way basis; in either case each Party may act as a "Disclosing Party" or a "Receiving Party" as the context requires.`,
    },

    { type: "h2", text: "1. Purpose" },
    {
      type: "p",
      text: 'The Parties wish to explore and/or pursue a potential or existing business relationship, such as a vendor engagement, partnership, collaboration, employment or investment (the "Purpose"). In connection with the Purpose, a Party may disclose to the other certain Confidential Information, and the Parties wish to protect such information on the terms set out below.',
    },

    { type: "h2", text: "2. Definition of Confidential Information" },
    {
      type: "p",
      text: '"Confidential Information" means any non-public information disclosed by or on behalf of a Disclosing Party to the Receiving Party, before or after the Effective Date, in any form (written, oral, electronic, visual or otherwise), that is designated as confidential or that a reasonable person would understand to be confidential given its nature or the circumstances of disclosure. It includes, without limitation, business plans, strategies, finances, pricing, customer and supplier lists, technical data, designs, source code, know-how, processes, trade secrets, personal data, and the existence and contents of this Agreement and of any discussions between the Parties.',
    },

    { type: "h2", text: "3. Exclusions" },
    {
      type: "p",
      text: "Confidential Information does not include information that the Receiving Party can demonstrate, by written records:",
    },
    {
      type: "ul",
      items: [
        "is or becomes publicly available without breach of this Agreement by the Receiving Party;",
        "was already lawfully known to the Receiving Party without any obligation of confidence prior to disclosure;",
        "is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information; or",
        "is rightfully received from a third party without any restriction and without breach of any obligation of confidentiality.",
      ],
    },

    { type: "h2", text: "4. Obligations of the Receiving Party" },
    { type: "p", text: "The Receiving Party shall:" },
    {
      type: "ul",
      items: [
        "use the Confidential Information solely for the Purpose and for no other purpose;",
        'not disclose the Confidential Information to any third party, except to its directors, employees, professional advisers and authorised representatives who have a genuine need to know for the Purpose and who are bound by obligations of confidentiality no less protective than those in this Agreement ("Representatives");',
        "protect the Confidential Information using at least the same degree of care it uses to protect its own confidential information, and in no event less than a reasonable degree of care;",
        "be responsible for any breach of this Agreement by its Representatives; and",
        "promptly notify the Disclosing Party of any actual or suspected unauthorised use or disclosure of Confidential Information.",
      ],
    },

    { type: "h2", text: "5. Compelled Disclosure" },
    {
      type: "p",
      text: "If the Receiving Party is required by law, regulation or a competent court or authority to disclose any Confidential Information, it shall, to the extent legally permitted, give the Disclosing Party prompt prior written notice so that the Disclosing Party may seek a protective order or other remedy, and shall disclose only that portion of the Confidential Information that it is legally required to disclose.",
    },

    { type: "h2", text: "6. Term" },
    {
      type: "p",
      text: "This Agreement remains in force for a period of [two (2)] year(s) from the Effective Date (or until terminated earlier by either Party on written notice), and the confidentiality obligations in respect of Confidential Information disclosed during the term shall survive for a further [three (3)] year(s) from the date of disclosure. Confidential Information that constitutes a trade secret shall remain protected for as long as it qualifies as a trade secret under applicable law.",
    },

    { type: "h2", text: "7. Return or Destruction of Information" },
    {
      type: "p",
      text: "Upon the written request of the Disclosing Party, or upon termination or expiry of this Agreement, the Receiving Party shall promptly return or, at the Disclosing Party's option, destroy all Confidential Information and all copies thereof in its possession or control, and on request certify such destruction in writing, save for copies required to be retained by law or routine electronic backup that is not readily accessible.",
    },

    { type: "h2", text: "8. No Licence / No Obligation" },
    {
      type: "p",
      text: "All Confidential Information remains the property of the Disclosing Party. Nothing in this Agreement grants the Receiving Party any licence or right, by implication or otherwise, in respect of the Confidential Information or any intellectual property, nor obligates either Party to disclose any information, to proceed with the Purpose, or to enter into any further agreement or transaction.",
    },

    { type: "h2", text: "9. No Warranty" },
    {
      type: "p",
      text: 'All Confidential Information is provided "as is". The Disclosing Party makes no representation or warranty, express or implied, as to the accuracy or completeness of the Confidential Information, and shall have no liability arising from the Receiving Party\'s use of or reliance on it.',
    },

    { type: "h2", text: "10. Remedies" },
    {
      type: "p",
      text: "The Parties acknowledge that a breach of this Agreement may cause irreparable harm for which monetary damages alone may be inadequate, and that the Disclosing Party shall be entitled to seek injunctive or other equitable relief, in addition to any other remedies available at law, without the requirement to post a bond.",
    },

    ...generalClause(11),
    ...governingLaw(c, 12),

    { type: "h2", text: "Execution" },
    {
      type: "p",
      text: "The Parties have caused this Agreement to be executed by their duly authorised representatives as of the Effective Date.",
    },
    twoPartySign(c, "the Counterparty"),
  ],
};

export const consultantAgreement: DocumentDef = {
  id: "consultant-agreement",
  name: "Consultant / Freelancer Agreement",
  category: "Company Legal Contracts",
  description:
    "Engages independent contractors with clear scope of work, fees, IP ownership, confidentiality, data protection and termination.",
  build: (c): Block[] => [
    { type: "h1", text: "Consulting / Independent Contractor Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: "This Agreement is entered into between:" },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Consultant Name], [PAN: __________], having address at [Address] (the "Consultant"). The Company and the Consultant are each a "Party".`,
    },

    { type: "h2", text: "1. Services" },
    {
      type: "p",
      text: 'The Consultant shall provide the services described in Annexure A ("Services") with due skill, care and diligence, in a professional and workmanlike manner, and within the agreed timelines and specifications.',
    },

    { type: "h2", text: "2. Independent Contractor" },
    {
      type: "p",
      text: "The Consultant is an independent contractor and not an employee, agent or partner of the Company. Nothing in this Agreement creates an employment relationship, and the Consultant is solely responsible for their own taxes, statutory contributions and insurances.",
    },

    { type: "h2", text: "3. Fees & Payment" },
    {
      type: "p",
      text: "The Company shall pay the Consultant ₹[______] [per month / per deliverable], within [15] days of receipt of a valid invoice, subject to deduction of TDS as applicable. The Consultant shall be responsible for GST compliance where applicable. Each Party shall bear its own costs except as expressly agreed.",
    },

    { type: "h2", text: "4. Intellectual Property" },
    {
      type: "p",
      text: "All deliverables and work product created under this Agreement shall, upon full payment, be the sole and exclusive property of the Company, and the Consultant hereby assigns all right, title and interest therein to the Company. The Consultant retains ownership of its pre-existing materials and grants the Company a perpetual, royalty-free licence to use them as embedded in the deliverables. The Consultant warrants that the deliverables will not infringe any third-party rights.",
    },

    { type: "h2", text: "5. Confidentiality & Data Protection" },
    {
      type: "p",
      text: "The Consultant shall keep all Confidential Information of the Company confidential during and after the term, shall use it only to perform the Services, and shall process any personal data shared by the Company in accordance with the Digital Personal Data Protection Act, 2023 and the Company's instructions.",
    },

    { type: "h2", text: "6. Warranties & Indemnity" },
    {
      type: "p",
      text: "The Consultant warrants that it has the right and capability to provide the Services and that the Services and deliverables will not infringe any third-party rights. The Consultant shall indemnify the Company against losses arising from breach of this Agreement or the Consultant's negligence or wilful misconduct.",
    },

    { type: "h2", text: "7. Term & Termination" },
    {
      type: "p",
      text: "This Agreement continues until the Services are completed or until terminated by either Party on fifteen (15) days' written notice. The Company may terminate immediately for material breach not cured within seven (7) days. On termination, the Consultant shall hand over completed work for which payment has been made, and accrued fees for work properly performed shall be paid.",
    },

    ...generalClause(8),
    ...governingLaw(c, 9),

    { type: "h2", text: "Execution" },
    twoPartySign(c, "the Consultant"),
  ],
};

export const marketingConsultantAgreement: DocumentDef = {
  id: "marketing-consultant-agreement",
  name: "Marketing Consultant Agreement",
  category: "Company Legal Contracts",
  description:
    "Engages a marketing consultant to streamline and execute marketing activities: scope, fees, confidentiality, the right to feature the consultant in promotional material, and a roles annexure.",
  build: (c): Block[] => [
    { type: "h1", text: "Marketing Consultant Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    {
      type: "p",
      text: `This Consultant Agreement (this "Agreement") is entered into on the date set forth on the signature page by and between:`,
    },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Consultant Name], [PAN: __________], residing at [Address] (the "Consultant"). The Company and the Consultant are referred to individually as a "Party" and collectively as the "Parties". The Parties agree as follows.`,
    },

    { type: "h2", text: "1. Services" },
    {
      type: "p",
      text: `The Consultant agrees to act as a marketing consultant to the Company and to provide advice and assistance for streamlining and executing the marketing activities of the Company (collectively, the "Services"). The detailed roles and responsibilities of the Consultant are set out in Annexure I.`,
    },

    { type: "h2", text: "2. Term" },
    {
      type: "p",
      text: "This Agreement shall commence on [Start Date] and continue until [End Date], unless terminated earlier in accordance with this Agreement. The term may be extended by mutual written agreement of the Parties before the end of the engagement period.",
    },

    { type: "h2", text: "3. Compensation & Taxes" },
    {
      type: "p",
      text: "In consideration of the Services, the Company shall pay the Consultant ₹[______] (Rupees [______] only) per month, plus applicable taxes. The compensation shall be subject to deduction of TDS as per the Income-tax Rules, and the Company shall issue the relevant TDS certificate. The Consultant shall be responsible for GST compliance where applicable.",
    },

    { type: "h2", text: "4. Reimbursement of Expenses" },
    {
      type: "p",
      text: "Any relevant field or business travel undertaken by the Consultant at the Company's request shall be claimed and reimbursed separately, in accordance with the Company's expense policy and against valid supporting documents.",
    },

    { type: "h2", text: "5. Roles & Responsibilities" },
    {
      type: "p",
      text: "The Consultant shall perform the roles and responsibilities laid down in Annexure I with due skill, care and diligence, in a professional manner, and within the timelines reasonably agreed with the Company.",
    },

    { type: "h2", text: "6. Term & Termination" },
    {
      type: "p",
      text: "This Agreement shall continue until terminated by either Party for any reason upon fifteen (15) days' prior written notice, without further obligation or liability except as accrued up to the date of termination. On termination:",
    },
    {
      type: "ul",
      items: [
        "the Company shall pay the Consultant the compensation due for all working days up to the date of termination; and",
        "the Consultant shall promptly hand over all Company work-related materials, documents and property in their possession.",
      ],
    },

    { type: "h2", text: "7. Independent Contractor" },
    {
      type: "p",
      text: "The Consultant's relationship with the Company is that of an independent contractor and not that of an employee. The Consultant will not be eligible for any employee benefits. The Company may make deductions such as TDS and any other deductions mandated by law from payments made to the Consultant, and the relevant TDS certificate will be issued. The Consultant has no authority to enter into contracts that bind the Company, or to create obligations on the part of the Company, without the prior written authorisation of the Company.",
    },

    { type: "h2", text: "8. Non-Disclosure of Confidential Information" },
    { type: "h3", text: "8.1 Agreement Not to Disclose" },
    {
      type: "p",
      text: "The Consultant agrees not to use any Confidential Information (as defined below) disclosed to the Consultant by the Company for the Consultant's own use or for any purpose other than to carry out discussions concerning, and the undertaking of, the Services. The Consultant agrees to take all reasonable measures to protect the secrecy of, and avoid disclosure or use of, the Company's Confidential Information in order to prevent it from falling into the public domain or the possession of persons other than agents of the Company or persons to whom the Company consents to such disclosure. Upon request by the Company, any materials or documents furnished by the Company to the Consultant in connection with the Services shall be promptly returned by the Consultant to the Company.",
    },
    { type: "h3", text: "8.2 Survival" },
    {
      type: "p",
      text: "The obligations of non-disclosure of Confidential Information shall continue to be in effect even after the termination of this Agreement.",
    },
    { type: "h3", text: "8.3 Definition of Confidential Information" },
    {
      type: "p",
      text: '"Confidential Information" means any information, technical data or know-how (whether disclosed before or after the date of this Agreement), including, but not limited to, information relating to business and product or service plans, financial projections, customer lists, business forecasts, sales and merchandising, human resources, patents, patent applications, computer object or source code, research, inventions, processes, designs, drawings, engineering, marketing or finance, that is confidential or proprietary or which would, under the circumstances, appear to a reasonable person to be confidential or proprietary. Confidential Information does not include information, technical data or know-how that: (i) is in the possession of the Consultant at the time of disclosure, as shown by the Consultant\'s files and records immediately prior to the time of disclosure; or (ii) becomes part of public knowledge or literature, not as a direct or indirect result of any improper inaction or action of the Consultant. Notwithstanding the foregoing, the Consultant may disclose Confidential Information with the prior written approval of the Company, or pursuant to the order or requirement of a court, administrative agency or other governmental body.',
    },

    { type: "h2", text: "9. No Rights Granted" },
    {
      type: "p",
      text: "Nothing in this Agreement shall be construed as granting any rights under any patent, copyright or other intellectual property right of the Company, nor shall this Agreement grant the Consultant any rights in or to the Company's Confidential Information, except the limited right to use the Confidential Information in connection with the Services.",
    },

    { type: "h2", text: "10. Company's Right to Disclose" },
    {
      type: "p",
      text: "The Company shall have the right to disclose the existence of this Agreement and the Consultant's status as a consultant, and to include the Consultant's name, image and profile in various promotional materials, including, but not limited to, executive summaries and the Company's website. In connection therewith:",
    },
    {
      type: "ul",
      items: [
        "the Consultant shall provide a profile image and profile brief which the Company may use for any necessary communication; and",
        "if there is any change to either the image or profile that the Consultant requires for official communication purposes, the Consultant shall intimate the Company to update the same.",
      ],
    },

    { type: "h2", text: "11. Miscellaneous" },
    {
      type: "p",
      text: "Any term of this Agreement may be amended or waived only with the written consent of the Parties. So long as the Consultant continues to serve as a consultant to the Company, the Consultant consents to the Company including the Consultant's name on its marketing materials, website, private placement memorandum or offering materials as a consultant of the Company. This Agreement, including any schedules and annexures hereto, constitutes the sole agreement of the Parties and supersedes all oral negotiations and prior writings with respect to its subject matter. This Agreement may be executed in counterparts, including by electronic signature, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.",
    },

    ...governingLaw(c, 12),

    { type: "h2", text: "Execution" },
    {
      type: "p",
      text: "IN WITNESS WHEREOF, the Parties have caused this Agreement to be executed by their duly authorised representatives as of the date first set forth above.",
    },
    {
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
        "The Consultant",
        "",
        "_______________________",
        "Name: __________________",
        "PAN: ___________________",
        "Address: ________________",
      ],
    },

    { type: "hr" },
    { type: "h2", text: "Annexure I — Roles & Responsibilities" },
    {
      type: "p",
      text: "The Consultant shall be responsible for streamlining and executing the Company's marketing activities, including the following (to be tailored to the engagement):",
    },
    {
      type: "ul",
      items: [
        "Developing and refining the Company's overall marketing strategy and positioning;",
        "Planning and executing digital marketing campaigns across relevant channels (social media, search, email and content);",
        "Managing brand communication, messaging and creative direction for consistency across channels;",
        "Overseeing content creation, scheduling and the marketing calendar;",
        "Tracking, analysing and reporting key marketing metrics, and recommending improvements;",
        "Coordinating with internal teams and external agencies or vendors as required; and",
        "Any other marketing activities reasonably requested by the Company within the scope of the Services.",
      ],
    },
  ],
};

export const vendorAgreement: DocumentDef = {
  id: "vendor-agreement",
  name: "Vendor / Service Provider Agreement",
  category: "Company Legal Contracts",
  description:
    "Engages agencies, software tools, production houses and other vendors: scope, fees, service levels, confidentiality, IP, indemnity and liability.",
  build: (c): Block[] => [
    { type: "h1", text: "Vendor / Service Provider Agreement" },
    { type: "p", text: `Date: ${todayLong()}` },
    { type: "p", text: "This Agreement is entered into between:" },
    { type: "p", text: regLine(c) },
    {
      type: "p",
      text: `AND [Vendor Name], a [entity type] having its registered office at [Address], [GSTIN: __________] (the "Vendor"). The Company and the Vendor are each a "Party".`,
    },

    { type: "h2", text: "1. Scope of Services" },
    {
      type: "p",
      text: 'The Vendor shall provide the goods and/or services described in Annexure A ("Services") in a professional and workmanlike manner, meeting the specifications, timelines and service levels set out therein.',
    },

    { type: "h2", text: "2. Fees, Invoicing & Taxes" },
    {
      type: "p",
      text: "The Company shall pay the fees set out in Annexure A within [30] days of receipt of a valid, undisputed invoice. Fees are exclusive of GST, which shall be charged as applicable. The Company may deduct TDS as required by law. Disputed amounts shall be notified in good faith and resolved promptly.",
    },

    { type: "h2", text: "3. Service Levels & Acceptance" },
    {
      type: "p",
      text: "The Vendor shall meet the agreed service levels. Deliverables are subject to the Company's acceptance; the Company may reject deliverables that do not conform to specifications, and the Vendor shall remedy non-conforming deliverables at no additional cost within a reasonable period.",
    },

    { type: "h2", text: "4. Confidentiality & Data Protection" },
    {
      type: "p",
      text: "The Vendor shall keep all Confidential Information of the Company confidential, and shall process any personal data shared by the Company solely to provide the Services and in compliance with the Digital Personal Data Protection Act, 2023 and the Company's instructions. The Vendor shall implement reasonable security safeguards and notify the Company promptly of any data breach.",
    },

    { type: "h2", text: "5. Intellectual Property" },
    {
      type: "p",
      text: "All deliverables created specifically for the Company under this Agreement shall, upon full payment, vest in the Company. The Vendor retains ownership of its pre-existing materials and tools, and grants the Company a non-exclusive licence to use them as necessary to enjoy the Services.",
    },

    { type: "h2", text: "6. Warranties & Indemnity" },
    {
      type: "p",
      text: "The Vendor warrants that it has the right and capability to provide the Services and that the Services and deliverables will not infringe any third-party rights. The Vendor shall indemnify the Company against losses, claims and liabilities arising from breach of this Agreement or the Vendor's negligence or wilful misconduct.",
    },

    { type: "h2", text: "7. Limitation of Liability" },
    {
      type: "p",
      text: "Save for breaches of confidentiality, infringement and indemnity obligations, each Party's aggregate liability arising out of or relating to this Agreement shall not exceed the total fees paid under this Agreement in the twelve (12) months preceding the claim. Neither Party is liable for indirect or consequential loss.",
    },

    { type: "h2", text: "8. Term & Termination" },
    {
      type: "p",
      text: "This Agreement continues for the term set out in Annexure A and may be terminated by either Party on thirty (30) days' written notice, or immediately for material breach not cured within fifteen (15) days. On termination, the Vendor shall hand over completed deliverables for which payment has been made and return Confidential Information.",
    },

    ...generalClause(9),
    ...governingLaw(c, 10),

    { type: "h2", text: "Execution" },
    twoPartySign(c, "the Vendor"),
  ],
};
