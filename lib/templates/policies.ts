import { CompanyData, DocumentDef, Block } from "../types";
import { displayName, shortName, todayLong, disclaimer } from "./shared";

function isLargeTeam(c: CompanyData): boolean {
  return c.headcount !== "1-9";
}

export const poshPolicy: DocumentDef = {
  id: "posh-policy",
  name: "POSH Policy (Prevention of Sexual Harassment)",
  category: "Compliance & Governance",
  description:
    "Mandatory under the POSH Act, 2013: definitions, Internal Committee composition, complaint process and timelines. Adapts to your team size.",
  build: (c): Block[] => {
    const large = isLargeTeam(c);
    const committee: Block[] = large
      ? [
          { type: "h2", text: "4. Internal Committee (IC)" },
          {
            type: "p",
            text: "As the Company employs ten (10) or more persons, it has constituted an Internal Committee (IC) in accordance with Section 4 of the Act. The IC comprises:",
          },
          {
            type: "ul",
            items: [
              "A Presiding Officer, being a woman employed at a senior level;",
              "Not fewer than two members from amongst employees, preferably committed to the cause of women or with experience in social work or legal knowledge;",
              "One external member from an NGO or association committed to the cause of women, or a person familiar with issues relating to sexual harassment.",
            ],
          },
          {
            type: "p",
            text: "At least one-half of the total members of the IC shall be women. The names and contact details of the IC members are notified separately and displayed at a conspicuous place at the workplace.",
          },
        ]
      : [
          { type: "h2", text: "4. Complaints Mechanism (Teams Below 10)" },
          {
            type: "p",
            text: "As the Company currently employs fewer than ten (10) persons, an Internal Committee is not statutorily required. Aggrieved persons may file complaints with the Local Committee (LC) constituted by the District Officer of the district in which the workplace is situated. The Company will provide all reasonable assistance, including details of the relevant Local Committee. The Company will constitute an Internal Committee promptly upon its headcount reaching ten (10) or more.",
          },
        ];

    return [
      { type: "h1", text: "Policy on Prevention of Sexual Harassment at the Workplace (POSH)" },
      { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },
      { type: "h2", text: "1. Purpose & Commitment" },
      {
        type: "p",
        text: `${shortName(c)} is committed to providing a safe, respectful and inclusive workplace free from sexual harassment. This policy is framed in compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and the rules thereunder, and applies to all employees, interns, contractors, trainees and visitors, at the workplace and at any place visited during the course of work.`,
      },
      { type: "h2", text: "2. What Constitutes Sexual Harassment" },
      {
        type: "p",
        text: "Sexual harassment includes any unwelcome act or behaviour (whether directly or by implication) such as:",
      },
      {
        type: "ul",
        items: [
          "Physical contact and advances;",
          "A demand or request for sexual favours;",
          "Sexually coloured remarks;",
          "Showing pornography;",
          "Any other unwelcome physical, verbal or non-verbal conduct of a sexual nature.",
        ],
      },
      { type: "h2", text: "3. Prohibition" },
      {
        type: "p",
        text: "Sexual harassment in any form is strictly prohibited and will be treated as misconduct, attracting disciplinary action up to and including termination, in addition to any action under the Act and applicable law.",
      },
      ...committee,
      { type: "h2", text: "5. Filing a Complaint" },
      {
        type: "p",
        text: "An aggrieved person may make a written complaint within three (3) months of the incident (extendable by a further three months for valid reasons). Assistance will be provided for preparing the complaint where required. Complaints may be sent to the designated contact at " + (c.email || "[grievance email]") + ".",
      },
      { type: "h2", text: "6. Inquiry & Timeline" },
      {
        type: "ul",
        items: [
          "Inquiry shall be completed within ninety (90) days.",
          "The committee shall submit its report within ten (10) days of completion of the inquiry.",
          "Principles of natural justice shall be followed and confidentiality maintained throughout.",
          "Interim relief (such as transfer or leave) may be recommended during the pendency of the inquiry.",
        ],
      },
      { type: "h2", text: "7. Confidentiality" },
      {
        type: "p",
        text: "The identity of the complainant, respondent, witnesses and the contents of the complaint and inquiry shall be kept strictly confidential, in accordance with Section 16 of the Act.",
      },
      { type: "h2", text: "8. Protection Against Retaliation & False Complaints" },
      {
        type: "p",
        text: "No person shall be victimised for making a complaint or assisting in an inquiry in good faith. Malicious or knowingly false complaints may, however, attract action; inability to substantiate a complaint shall not by itself attract action.",
      },
      { type: "h2", text: "9. Awareness & Annual Report" },
      {
        type: "p",
        text: "The Company shall organise awareness programmes, display the penal consequences of sexual harassment conspicuously, and file the annual report with the District Officer as required under the Act.",
      },
      disclaimer(),
    ];
  },
};

export const leavePolicy: DocumentDef = {
  id: "leave-policy",
  name: "Leave Policy",
  category: "Employee Policies",
  description:
    "A clear leave framework covering casual, sick and earned leave, maternity and paternity benefits, and the public-holiday calendar.",
  build: (c): Block[] => [
    { type: "h1", text: "Leave Policy" },
    { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },
    { type: "h2", text: "1. Scope" },
    {
      type: "p",
      text: "This policy applies to all confirmed employees of the Company. Leave for employees on probation and interns shall be at the discretion of management. The leave year runs from 1 January to 31 December.",
    },
    { type: "h2", text: "2. Types of Leave" },
    {
      type: "kv",
      rows: [
        ["Casual Leave (CL)", "12 days per year"],
        ["Sick Leave (SL)", "12 days per year"],
        ["Earned / Privilege Leave (EL)", "15 days per year (as per applicable S&E Act)"],
        ["Public Holidays", "As per the annual holiday list (incl. 3 national holidays)"],
        ["Maternity Leave", "As per the Maternity Benefit Act, 1961 (26 weeks)"],
        ["Paternity Leave", "5 working days (Company benefit)"],
      ],
    },
    { type: "h2", text: "3. Public Holiday Calendar" },
    {
      type: "p",
      text: "The Company shall publish an annual list of public holidays at the start of each calendar year, including the three national holidays (Republic Day, Independence Day and Gandhi Jayanti) and other gazetted holidays applicable in the relevant State.",
    },
    { type: "h2", text: "4. Applying for Leave" },
    {
      type: "ul",
      items: [
        "Planned leave must be applied for and approved in advance through the designated system.",
        "Sick leave of more than two consecutive days may require a medical certificate.",
        "Unapproved absence may be treated as leave without pay and, if prolonged, as misconduct.",
      ],
    },
    { type: "h2", text: "5. Carry-forward & Encashment" },
    {
      type: "p",
      text: "Up to [__] days of earned leave may be carried forward to the next year. Casual and sick leave lapse at year-end and are not encashable. Encashment of earned leave, if any, shall be governed by applicable law and Company policy.",
    },
    { type: "h2", text: "6. Statutory Compliance" },
    {
      type: "p",
      text: "This policy shall at all times be read consistently with the applicable Shops & Establishments Act of the relevant State and other applicable labour laws. Where statute provides a higher entitlement, the statutory entitlement shall prevail.",
    },
    disclaimer(),
  ],
};

export const codeOfConduct: DocumentDef = {
  id: "code-of-conduct",
  name: "Code of Conduct Policy",
  category: "Employee Policies",
  description:
    "Sets behavioural standards for professional conduct, dress code, social-media use and conflicts of interest.",
  build: (c): Block[] => [
    { type: "h1", text: "Code of Conduct Policy" },
    { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },
    { type: "h2", text: "1. Purpose & Scope" },
    {
      type: "p",
      text: `This Code of Conduct sets out the standards of behaviour expected of every employee, intern and contractor of ${shortName(c)}. It applies at the workplace, at Company events, and wherever an individual represents the Company.`,
    },
    { type: "h2", text: "2. Professional Behaviour" },
    {
      type: "ul",
      items: [
        "Treat colleagues, clients, customers and partners with respect, courtesy and fairness.",
        "Maintain honesty and integrity in all dealings; do not misrepresent facts or falsify records.",
        "Comply with all applicable laws and Company policies, including the POSH Policy.",
        "Use Company resources, funds and time responsibly and only for legitimate business purposes.",
      ],
    },
    { type: "h2", text: "3. Dress Code" },
    {
      type: "p",
      text: "Employees shall dress in a manner appropriate to their role and the occasion. Smart-casual attire is acceptable for routine work; business attire is expected for client meetings and external representation, unless otherwise advised.",
    },
    { type: "h2", text: "4. Social Media & Communications" },
    {
      type: "ul",
      items: [
        "Do not disclose Confidential Information or client/customer data on social media or any public forum.",
        "Do not speak on behalf of the Company publicly unless authorised to do so.",
        "Ensure personal posts that reference the Company are respectful and clearly personal opinions.",
      ],
    },
    { type: "h2", text: "5. Conflict of Interest" },
    {
      type: "p",
      text: "Employees must avoid situations where personal interests conflict, or appear to conflict, with the interests of the Company. Any outside employment, directorship, financial interest in a competitor/vendor, or personal relationship that could affect impartiality must be disclosed in writing to management.",
    },
    { type: "h2", text: "6. Anti-Bribery & Gifts" },
    {
      type: "p",
      text: "Employees shall not offer, give, solicit or accept any bribe, kickback or improper advantage. Gifts or hospitality of more than nominal value must be declined or disclosed and approved.",
    },
    { type: "h2", text: "7. Consequences of Breach" },
    {
      type: "p",
      text: "Breach of this Code constitutes misconduct and may result in disciplinary action up to and including termination, in addition to any action under applicable law.",
    },
    disclaimer(),
  ],
};

export const performanceReviewPolicy: DocumentDef = {
  id: "performance-review-policy",
  name: "Performance Review Policy",
  category: "Employee Policies",
  description:
    "Defines the appraisal cycle, how performance is measured (KPIs), promotion criteria and the performance-improvement (PIP) process.",
  build: (c): Block[] => [
    { type: "h1", text: "Performance Review Policy" },
    { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },
    { type: "h2", text: "1. Purpose" },
    {
      type: "p",
      text: `${shortName(c)} is committed to a fair, transparent and merit-based approach to evaluating and developing performance. This policy sets out how performance is reviewed, recognised and improved.`,
    },
    { type: "h2", text: "2. Appraisal Cycle" },
    {
      type: "kv",
      rows: [
        ["Review Frequency", "Annual, with a mid-year check-in"],
        ["Appraisal Period", "1 April – 31 March (or as notified)"],
        ["Self-Assessment", "Completed by the employee before the review"],
        ["Reviewer", "Reporting manager, moderated by management"],
      ],
    },
    { type: "h2", text: "3. Key Performance Indicators (KPIs)" },
    {
      type: "p",
      text: "Each employee shall have role-specific KPIs and goals agreed with their manager at the start of the cycle. Performance shall be assessed against these KPIs, behavioural competencies, and adherence to the Company's values and Code of Conduct.",
    },
    { type: "h2", text: "4. Ratings & Outcomes" },
    {
      type: "ul",
      items: [
        "Performance is rated on a defined scale (e.g., Exceeds / Meets / Partially Meets / Below Expectations).",
        "Ratings inform decisions on increments, variable pay, promotions and development plans.",
        "Outcomes are at the Company's discretion and subject to business performance.",
      ],
    },
    { type: "h2", text: "5. Promotion Criteria" },
    {
      type: "p",
      text: "Promotions are based on sustained high performance, demonstrated readiness for the next role, availability of a suitable position and business need. Tenure alone does not guarantee promotion.",
    },
    { type: "h2", text: "6. Performance Improvement Plan (PIP)" },
    {
      type: "ul",
      items: [
        "Where performance is below expectations, the employee may be placed on a Performance Improvement Plan (PIP) for a defined period (typically 30–90 days).",
        "The PIP sets clear, measurable objectives, support and review checkpoints.",
        "Failure to meet the PIP objectives may result in further action, including reassignment or termination, in accordance with the Employment Agreement.",
      ],
    },
    { type: "h2", text: "7. Grievances" },
    {
      type: "p",
      text: "An employee who disagrees with a review outcome may raise it with HR/management within fifteen (15) days, and a fair review of the concern shall be undertaken.",
    },
    disclaimer(),
  ],
};
