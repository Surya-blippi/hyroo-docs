import { CompanyData, DocumentDef, Block } from "../types";
import { displayName, shortName, todayLong, disclaimer } from "./shared";

function isLargeTeam(c: CompanyData): boolean {
  return c.headcount !== "1-9";
}

const contact = (c: CompanyData) => c.email || "[designated contact email]";

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
          {
            type: "p",
            text: "As the Company employs ten (10) or more persons, it has constituted an Internal Committee (IC) in accordance with Section 4 of the Act. The IC comprises:",
          },
          {
            type: "ul",
            items: [
              "A Presiding Officer, being a woman employed at a senior level in the workplace;",
              "Not fewer than two members from amongst employees, preferably committed to the cause of women or having experience in social work or legal knowledge;",
              "One external member from a non-governmental organisation or association committed to the cause of women, or a person familiar with issues relating to sexual harassment.",
            ],
          },
          {
            type: "p",
            text: "At least one-half of the total members of the IC shall be women. The names and contact details of the IC members are notified separately and displayed at a conspicuous place at the workplace.",
          },
        ]
      : [
          {
            type: "p",
            text: "As the Company currently employs fewer than ten (10) persons, an Internal Committee is not statutorily required. Aggrieved persons may file complaints with the Local Committee (LC) constituted by the District Officer of the district in which the workplace is situated. The Company will provide all reasonable assistance, including the relevant Local Committee's details, and will constitute an Internal Committee promptly upon its headcount reaching ten (10) or more.",
          },
        ];

    return [
      { type: "h1", text: "Policy on Prevention of Sexual Harassment at the Workplace (POSH)" },
      { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },

      { type: "h2", text: "1. Purpose & Commitment" },
      {
        type: "p",
        text: `${shortName(c)} is committed to providing a safe, respectful and inclusive workplace in which every person is treated with dignity and is free from sexual harassment. This Policy is framed in compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (the "Act") and the rules made thereunder, and reflects the Company's zero-tolerance approach to sexual harassment in any form.`,
      },
      {
        type: "p",
        text: "This Policy applies to all employees, interns, contractors, trainees, apprentices and visitors, regardless of seniority or status, at the workplace and at any place visited by an employee arising out of or during the course of employment, including transportation provided by the Company.",
      },

      { type: "h2", text: "2. Definitions" },
      {
        type: "ul",
        items: [
          "\"Aggrieved Person\" means a person who alleges to have been subjected to any act of sexual harassment, consistent with the protections under the Act.",
          "\"Workplace\" includes the Company's premises and any place visited by an employee in connection with work, including remote or virtual work environments and Company-sponsored events.",
          "\"Respondent\" means a person against whom a complaint of sexual harassment has been made.",
        ],
      },

      { type: "h2", text: "3. What Constitutes Sexual Harassment" },
      {
        type: "p",
        text: "Sexual harassment includes any one or more of the following unwelcome acts or behaviour (whether directly or by implication):",
      },
      {
        type: "ul",
        items: [
          "physical contact and advances;",
          "a demand or request for sexual favours;",
          "sexually coloured remarks;",
          "showing pornography; or",
          "any other unwelcome physical, verbal or non-verbal conduct of a sexual nature.",
        ],
      },
      {
        type: "p",
        text: "The following circumstances, among others, if they occur or are present in relation to or connected with any act of sexual harassment, may amount to sexual harassment: an implied or explicit promise of preferential treatment; an implied or explicit threat of detrimental treatment; a threat about present or future employment status; interference with work or the creation of an intimidating, hostile or offensive work environment; or humiliating treatment likely to affect health or safety.",
      },

      { type: "h2", text: "4. Prohibition" },
      {
        type: "p",
        text: "Sexual harassment in any form is strictly prohibited and will be treated as misconduct, attracting disciplinary action up to and including termination, in addition to any action under the Act and other applicable law. This applies regardless of the seniority of the person concerned.",
      },

      { type: "h2", text: "5. Complaints Mechanism" },
      ...committee,

      { type: "h2", text: "6. Filing a Complaint" },
      {
        type: "p",
        text: `An aggrieved person may make a written complaint within three (3) months of the date of the incident (and, in the case of a series of incidents, within three months of the last incident), extendable by a further three months for valid reasons recorded in writing. Assistance will be provided for preparing the complaint where required. Complaints may be sent to the designated contact at ${contact(c)}.`,
      },

      { type: "h2", text: "7. Conciliation" },
      {
        type: "p",
        text: "Before initiating an inquiry, and at the request of the aggrieved person, the Committee may take steps to settle the matter through conciliation, provided that no monetary settlement shall be made the basis of conciliation. If a settlement is reached, it shall be recorded and copies provided to the parties, and no further inquiry shall ordinarily be conducted in respect of that complaint.",
      },

      { type: "h2", text: "8. Inquiry & Timeline" },
      {
        type: "ul",
        items: [
          "The inquiry shall be conducted in accordance with the principles of natural justice, giving both parties a fair opportunity to be heard.",
          "The inquiry shall be completed within ninety (90) days.",
          "The Committee shall submit its report to the employer / District Officer within ten (10) days of completion of the inquiry, and the report shall be made available to the parties.",
          "Confidentiality shall be maintained throughout the process.",
        ],
      },

      { type: "h2", text: "9. Interim Measures" },
      {
        type: "p",
        text: "During the pendency of an inquiry, on the written request of the aggrieved person, the Committee may recommend interim measures such as transfer of the aggrieved person or the respondent, grant of leave to the aggrieved person (up to three months, in addition to normal entitlement), or restraint on the respondent from reporting on the work performance of the aggrieved person.",
      },

      { type: "h2", text: "10. Action on Findings" },
      {
        type: "p",
        text: "If the allegation is proven, the Committee may recommend disciplinary action in accordance with the Company's rules and the Act, and may recommend that the Company deduct from the respondent's salary such sum as it considers appropriate to be paid to the aggrieved person. If the allegation is not proven, the Committee may recommend that no action be taken.",
      },

      { type: "h2", text: "11. Confidentiality" },
      {
        type: "p",
        text: "The identity of the complainant, the respondent, the witnesses, and the contents of the complaint, the inquiry proceedings and the recommendations shall be kept strictly confidential, in accordance with Section 16 of the Act, and shall not be published, communicated or made known to the public, press or media in any manner.",
      },

      { type: "h2", text: "12. Protection Against Retaliation & False Complaints" },
      {
        type: "p",
        text: "No person shall be victimised or subjected to any detriment for making a complaint or for assisting in an inquiry in good faith. Malicious or knowingly false complaints, or the production of forged or misleading evidence, may attract action against the person responsible; however, a mere inability to substantiate a complaint or to provide adequate proof shall not, by itself, attract any action.",
      },

      { type: "h2", text: "13. Roles & Responsibilities" },
      {
        type: "ul",
        items: [
          "The Company: provides a safe environment, constitutes and supports the Committee, ensures awareness, and assists the Committee and authorities.",
          "The Committee: receives complaints, conducts inquiries fairly and confidentially, and submits reports within the prescribed timelines.",
          "Every employee: behaves respectfully, refrains from any form of sexual harassment, and co-operates with inquiries.",
        ],
      },

      { type: "h2", text: "14. Awareness & Annual Report" },
      {
        type: "p",
        text: "The Company shall organise periodic awareness and orientation programmes for employees and Committee members, conspicuously display the penal consequences of sexual harassment and the order constituting the Committee, and file the annual report with the District Officer as required under the Act.",
      },

      { type: "h2", text: "15. Review & Amendment" },
      {
        type: "p",
        text: "The Company may review and amend this Policy from time to time to ensure continued compliance with the Act and to reflect best practice. The latest version supersedes all earlier versions and will be communicated to employees.",
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

    { type: "h2", text: "1. Purpose & Scope" },
    {
      type: "p",
      text: "This Leave Policy sets out the leave entitlements of employees and the process for applying for and approving leave. It applies to all confirmed employees of the Company; leave for employees on probation and for interns shall be at the discretion of management. The leave year runs from 1 January to 31 December unless otherwise notified.",
    },

    { type: "h2", text: "2. Types of Leave & Entitlement" },
    {
      type: "kv",
      rows: [
        ["Casual Leave (CL)", "12 days per year"],
        ["Sick Leave (SL)", "12 days per year"],
        ["Earned / Privilege Leave (EL)", "15 days per year (as per the applicable Shops & Establishments Act)"],
        ["Public Holidays", "As per the annual holiday list (including 3 national holidays)"],
        ["Maternity Leave", "As per the Maternity Benefit Act, 1961 (26 weeks)"],
        ["Paternity Leave", "5 working days (Company benefit)"],
        ["Bereavement Leave", "3 working days (Company benefit)"],
      ],
    },

    { type: "h2", text: "3. Public Holiday Calendar" },
    {
      type: "p",
      text: "The Company shall publish an annual list of public holidays at the start of each calendar year, including the three national holidays (Republic Day, Independence Day and Gandhi Jayanti) and other gazetted holidays applicable in the relevant State. A reasonable number of optional / restricted holidays may also be offered.",
    },

    { type: "h2", text: "4. Applying for Leave" },
    {
      type: "ul",
      items: [
        "Planned leave must be applied for and approved in advance through the designated system or process.",
        "Leave is subject to approval based on business needs; the Company may decline or reschedule leave for operational reasons.",
        "Sick leave of more than two (2) consecutive days may require a medical certificate.",
        "Unapproved or unintimated absence may be treated as leave without pay and, if prolonged, as misconduct.",
      ],
    },

    { type: "h2", text: "5. Carry-Forward & Encashment" },
    {
      type: "p",
      text: "Up to [__] days of unused earned leave may be carried forward to the next leave year. Casual and sick leave lapse at the end of the leave year and are not encashable. Encashment of earned leave, if any, shall be governed by applicable law and Company policy, and is ordinarily settled at the time of full and final settlement.",
    },

    { type: "h2", text: "6. Leave During Notice Period" },
    {
      type: "p",
      text: "Leave may not ordinarily be availed during the notice period except with prior written approval. Any unapproved absence during notice may extend the notice period correspondingly.",
    },

    { type: "h2", text: "7. Statutory Compliance" },
    {
      type: "p",
      text: "This Policy shall at all times be read consistently with the applicable Shops & Establishments Act of the relevant State and other applicable labour laws. Where statute provides a higher entitlement than this Policy, the statutory entitlement shall prevail.",
    },

    { type: "h2", text: "8. Review & Amendment" },
    {
      type: "p",
      text: "The Company may review and amend this Policy from time to time. The latest version supersedes all earlier versions and will be communicated to employees.",
    },
    disclaimer(),
  ],
};

export const codeOfConduct: DocumentDef = {
  id: "code-of-conduct",
  name: "Code of Conduct Policy",
  category: "Employee Policies",
  description:
    "Sets behavioural standards: professional conduct, equal opportunity, dress code, IT and social-media use, conflicts of interest, anti-bribery and reporting.",
  build: (c): Block[] => [
    { type: "h1", text: "Code of Conduct Policy" },
    { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },

    { type: "h2", text: "1. Purpose & Scope" },
    {
      type: "p",
      text: `This Code of Conduct (the "Code") sets out the standards of behaviour, professionalism and integrity expected of every director, employee, intern, trainee, consultant and contractor of ${shortName(c)} (collectively, "Personnel"). It reflects the values that guide how the Company conducts its business and how Personnel are expected to treat one another and those with whom they deal.`,
    },
    {
      type: "p",
      text: "This Code applies at the workplace and at all locations and occasions connected with work, including Company premises, client and vendor sites, off-site meetings, business travel, Company-sponsored events, and any digital or virtual environment used for work. It also applies wherever an individual could reasonably be understood to be representing the Company. This Code supplements, and does not replace, the terms of any individual's employment or engagement contract and the Company's other policies, including the Policy on Prevention of Sexual Harassment (POSH).",
    },

    { type: "h2", text: "2. Definitions" },
    {
      type: "ul",
      items: [
        "\"Company\" means the entity identified in the letterhead above and its successors and permitted assigns.",
        "\"Confidential Information\" means any non-public information relating to the Company, its clients, customers, vendors or employees, in any form, whether or not marked confidential.",
        "\"Management\" means the directors, partners or designated officers responsible for the administration of this Code.",
      ],
    },

    { type: "h2", text: "3. Core Principles" },
    {
      type: "p",
      text: "Personnel are expected to act lawfully, ethically and in the best interests of the Company at all times, and to apply the following principles in their day-to-day conduct:",
    },
    {
      type: "ul",
      items: [
        "Integrity: be honest and truthful, and never misrepresent facts or falsify records, reports or accounts.",
        "Respect: treat colleagues, clients, customers, vendors and partners with dignity, courtesy and fairness.",
        "Accountability: take ownership of one's actions and decisions, and raise concerns promptly and in good faith.",
        "Compliance: follow all applicable laws, regulations and Company policies.",
      ],
    },

    { type: "h2", text: "4. Professional Behaviour" },
    {
      type: "ul",
      items: [
        "Treat all colleagues, clients, customers and partners with respect, courtesy and fairness, free from discrimination, bullying or harassment of any kind.",
        "Maintain honesty and integrity in all dealings; do not misrepresent facts, falsify records, or knowingly create misleading information.",
        "Comply with all applicable laws and Company policies, including the POSH Policy and the Company's data-protection obligations.",
        "Use Company resources, funds, equipment and time responsibly and only for legitimate business purposes.",
        "Co-operate fully and honestly with any internal investigation or audit.",
      ],
    },

    { type: "h2", text: "5. Equal Opportunity & Non-Discrimination" },
    {
      type: "p",
      text: "The Company is an equal-opportunity organisation and is committed to a workplace free from discrimination. Decisions on recruitment, remuneration, training, promotion and termination shall be based on merit, performance and business requirements, without regard to gender, religion, caste, race, ethnicity, disability, age, marital status, sexual orientation or any other characteristic protected by applicable law.",
    },

    { type: "h2", text: "6. Health, Safety & Workplace Environment" },
    {
      type: "ul",
      items: [
        "Maintain a safe, clean and hazard-free working environment and report unsafe conditions promptly.",
        "Comply with all health, safety and security procedures notified by the Company.",
        "Do not attend or perform work while under the influence of alcohol or illegal substances; possession or use of illegal drugs at the workplace is strictly prohibited.",
      ],
    },

    { type: "h2", text: "7. Dress Code" },
    {
      type: "p",
      text: "Personnel shall dress in a manner appropriate to their role and the occasion. Smart-casual attire is acceptable for routine work; business attire is expected for client meetings and external representation, unless otherwise advised. Personal grooming and presentation should reflect a professional image of the Company.",
    },

    { type: "h2", text: "8. Confidentiality & Data Protection" },
    {
      type: "ul",
      items: [
        "Protect Confidential Information and personal data of employees, clients and customers, and use it only for legitimate business purposes.",
        "Do not access, copy, share or remove Confidential Information except as authorised and necessary for work.",
        "Confidentiality obligations continue after the end of employment or engagement, in accordance with applicable agreements and law.",
      ],
    },

    { type: "h2", text: "9. Use of Company Systems & Information Technology" },
    {
      type: "p",
      text: "Company systems, email, internet access and devices are provided primarily for business use. Personnel must use them lawfully and responsibly, must not install unauthorised software or circumvent security controls, and must not use Company systems to create, store or transmit unlawful, defamatory or offensive material. The Company may monitor the use of its systems to the extent permitted by law.",
    },

    { type: "h2", text: "10. Social Media & External Communications" },
    {
      type: "ul",
      items: [
        "Do not disclose Confidential Information or client/customer data on social media or any public forum.",
        "Do not speak on behalf of the Company publicly unless authorised to do so.",
        "Ensure personal posts that reference the Company are respectful and clearly identified as personal opinions.",
      ],
    },

    { type: "h2", text: "11. Conflict of Interest" },
    {
      type: "p",
      text: "Personnel must avoid situations where personal interests conflict, or appear to conflict, with the interests of the Company. Any outside employment, directorship, financial interest in a competitor or vendor, or personal relationship that could affect impartiality must be disclosed in writing to Management at the earliest opportunity, so that it can be reviewed and managed appropriately.",
    },

    { type: "h2", text: "12. Anti-Bribery, Gifts & Hospitality" },
    {
      type: "p",
      text: "Personnel shall not offer, give, solicit or accept any bribe, kickback or improper advantage, whether directly or through a third party. Gifts or hospitality of more than nominal value must be declined, or disclosed to and approved by Management. Facilitation payments of any kind are prohibited. The Company maintains zero tolerance for corruption in any form.",
    },

    { type: "h2", text: "13. Protection of Company Assets" },
    {
      type: "p",
      text: "Personnel are responsible for safeguarding Company property entrusted to them, including equipment, devices, intellectual property, funds and information. Company assets must not be used for personal gain or removed from the premises without authorisation, and must be returned on the cessation of employment or engagement.",
    },

    { type: "h2", text: "14. Reporting Violations & Non-Retaliation" },
    {
      type: "p",
      text: `Personnel who become aware of any actual or suspected breach of this Code are encouraged to report it promptly to their reporting manager or to Management at ${contact(c)} (designated contact). Reports may be made confidentially. The Company prohibits any retaliation against a person who raises a concern in good faith, even if the concern is later found to be unsubstantiated.`,
    },

    { type: "h2", text: "15. Consequences of Breach" },
    {
      type: "p",
      text: "Breach of this Code constitutes misconduct and may result in disciplinary action up to and including termination of employment or engagement, in addition to any action available to the Company under applicable law. The nature of the action will depend on the seriousness of the breach and the circumstances of the case, and will follow the principles of natural justice.",
    },

    { type: "h2", text: "16. Review & Amendment" },
    {
      type: "p",
      text: "The Company may review, amend or update this Code from time to time. The current version supersedes all earlier versions. Personnel will be notified of material changes, and continued employment or engagement constitutes acceptance of the updated Code.",
    },

    { type: "h2", text: "17. Acknowledgement" },
    {
      type: "p",
      text: "I confirm that I have read, understood and agree to comply with this Code of Conduct.",
    },
    {
      type: "sign",
      left: [
        "Personnel",
        "",
        "_______________________",
        "Name: __________________",
        "Designation: ____________",
        "Date: __________________",
      ],
      right: [],
    },
    disclaimer(),
  ],
};

export const performanceReviewPolicy: DocumentDef = {
  id: "performance-review-policy",
  name: "Performance Review Policy",
  category: "Employee Policies",
  description:
    "Defines the appraisal cycle, KPIs and assessment criteria, ratings, calibration, promotion criteria and the performance-improvement (PIP) process.",
  build: (c): Block[] => [
    { type: "h1", text: "Performance Review Policy" },
    { type: "p", text: `${displayName(c)} | Effective Date: ${todayLong()}` },

    { type: "h2", text: "1. Purpose" },
    {
      type: "p",
      text: `${shortName(c)} is committed to a fair, transparent and merit-based approach to evaluating, recognising and developing the performance of its people. This Performance Review Policy (the "Policy") describes how performance is planned, assessed, rewarded and improved, with the objective of aligning individual contribution with the Company's goals and supporting the growth of every employee.`,
    },

    { type: "h2", text: "2. Scope & Objectives" },
    {
      type: "p",
      text: "This Policy applies to all confirmed employees of the Company, and, where indicated, to employees on probation and to interns and trainees on a proportionate basis. Its objectives are to:",
    },
    {
      type: "ul",
      items: [
        "set clear expectations and measurable goals at the start of each cycle;",
        "provide regular, constructive feedback throughout the year;",
        "recognise and reward strong performance objectively and consistently;",
        "identify development needs and support career progression; and",
        "address under-performance fairly and in a structured manner.",
      ],
    },

    { type: "h2", text: "3. Appraisal Cycle" },
    {
      type: "kv",
      rows: [
        ["Review Frequency", "Annual, with a formal mid-year check-in"],
        ["Appraisal Period", "1 April to 31 March (or as notified by the Company)"],
        ["Goal Setting", "At the start of the cycle, between employee and manager"],
        ["Self-Assessment", "Completed by the employee before the review meeting"],
        ["Reviewer", "Reporting manager, moderated by Management / HR"],
        ["Outcome Communication", "Documented and shared with the employee after moderation"],
      ],
    },

    { type: "h2", text: "4. Goal Setting & Key Performance Indicators (KPIs)" },
    {
      type: "p",
      text: "At the start of each cycle, every employee shall agree role-specific goals and KPIs with their manager. Goals should be specific, measurable, achievable, relevant and time-bound (SMART) and aligned with team and Company objectives. Goals may be reviewed and adjusted during the cycle to reflect changing business priorities, with such changes recorded in writing.",
    },

    { type: "h2", text: "5. Assessment Criteria" },
    {
      type: "p",
      text: "Performance shall be assessed holistically against the following dimensions:",
    },
    {
      type: "ul",
      items: [
        "delivery against agreed KPIs and goals;",
        "behavioural competencies, such as collaboration, ownership, communication and problem-solving;",
        "adherence to the Company's values, the Code of Conduct and applicable policies; and",
        "demonstrated initiative, learning and contribution beyond the defined role, where applicable.",
      ],
    },

    { type: "h2", text: "6. Ratings & Outcomes" },
    {
      type: "ul",
      items: [
        "Performance is rated on a defined scale (for example: Exceeds Expectations / Meets Expectations / Partially Meets Expectations / Below Expectations).",
        "Ratings inform decisions on increments, variable pay, promotions, training and development plans.",
        "Outcomes are at the Company's discretion and are subject to overall business performance and budgetary considerations.",
      ],
    },

    { type: "h2", text: "7. Calibration & Moderation" },
    {
      type: "p",
      text: "To ensure fairness and consistency across teams, ratings shall be reviewed through a calibration / moderation process by Management or HR before they are finalised. The purpose of calibration is to correct unconscious bias, apply rating standards uniformly, and ensure that outcomes reflect relative contribution across the organisation.",
    },

    { type: "h2", text: "8. Continuous Feedback & Documentation" },
    {
      type: "p",
      text: "Performance management is an ongoing process rather than a once-a-year event. Managers are encouraged to provide timely, specific and constructive feedback throughout the cycle, and to recognise good work as it happens. Significant feedback, achievements and concerns should be documented contemporaneously so that the formal review is a fair summary of the full period.",
    },

    { type: "h2", text: "9. Promotion Criteria" },
    {
      type: "p",
      text: "Promotions are based on sustained high performance, demonstrated readiness for the responsibilities of the next role, the availability of a suitable position, and business need. Tenure alone does not guarantee a promotion. Promotion decisions are made by Management following review and, where applicable, calibration.",
    },

    { type: "h2", text: "10. Performance Improvement Plan (PIP)" },
    {
      type: "ul",
      items: [
        "Where performance is below expectations, the employee may be placed on a Performance Improvement Plan (PIP) for a defined period (typically [30] to [90] days).",
        "The PIP sets clear, measurable objectives, the support to be provided, and review checkpoints.",
        "Progress is reviewed at the checkpoints, and the employee is given a reasonable opportunity to improve.",
        "Failure to meet the PIP objectives may result in further action, including reassignment, extension of the plan, or termination, in accordance with the Employment Agreement and applicable law.",
      ],
    },

    { type: "h2", text: "11. Recognition & Rewards" },
    {
      type: "p",
      text: "The Company may operate recognition and reward mechanisms, such as spot awards, performance bonuses or other forms of acknowledgement, to celebrate exceptional contribution. The nature and frequency of such recognition are at the Company's discretion.",
    },

    { type: "h2", text: "12. Roles & Responsibilities" },
    {
      type: "ul",
      items: [
        "Employees: set goals with their manager, complete self-assessment honestly, seek feedback, and own their development.",
        "Managers: set clear expectations, give regular feedback, assess fairly, and support their team's growth.",
        "Management / HR: administer the process, ensure calibration and consistency, and maintain records securely.",
      ],
    },

    { type: "h2", text: "13. Confidentiality of Records" },
    {
      type: "p",
      text: "Performance reviews, ratings and related records are confidential and shall be accessible only to the employee, their manager, and authorised Management / HR personnel on a need-to-know basis, and shall be retained and processed in accordance with applicable law.",
    },

    { type: "h2", text: "14. Grievances" },
    {
      type: "p",
      text: "An employee who disagrees with a review outcome may raise the matter in writing with HR / Management within [15] days of receiving the outcome. A fair and impartial review of the concern shall be undertaken, and the employee shall be informed of the outcome.",
    },

    { type: "h2", text: "15. Review & Amendment" },
    {
      type: "p",
      text: "The Company may review and amend this Policy from time to time to reflect business needs and legal requirements. The latest version supersedes all earlier versions and will be communicated to employees.",
    },
    disclaimer(),
  ],
};
