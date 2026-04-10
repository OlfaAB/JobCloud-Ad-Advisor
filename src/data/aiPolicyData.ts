export const aiPolicyData = {
  documentControl: {
    version: "1.0",
    date: "[To be completed]",
    owner: "CEO (formal owner and visible sponsor)",
    approvedBy: "[To be completed]"
  },

  purpose: {
    description: "This policy establishes the organization's overarching principles and commitments regarding the design, development, procurement, deployment, and monitoring of AI systems. It ensures that:",
    items: [
      "AI use aligns with the organization's strategic values and ethical commitments,",
      "Legal obligations (the EU AI Act, GDPR, sectoral laws) are fulfilled,",
      "Technical and organizational safeguards are implemented in proportion to risk,",
      "A culture of accountability, fairness, and transparency is promoted across all AI-related activities."
    ]
  },

  scope: {
    aiSystemsCovered: [
      "All AI used in production use cases that process personal data, rank people, generate content, or influence decisions about users, customers, candidates, or employees",
      "Tests that affect customers or users",
      "Third-party AI providers explicitly included, such as third-party/vendor AI embedded in our services, including LLM APIs, managed models, and AI features activated in corporate tools",
      "Internal operations involving ranking people",
      "Both general-purpose AI and high-risk AI systems, as defined by EU AI Act Annex III and IV and internal criticality classifications"
    ],
    rolesAndFunctions: [
      "All employees including Executive Management Team (EMT) involved in AI system lifecycle activities",
      "All departments and roles involved in AI system lifecycle activities (data science, engineering, legal, operations, product, risk, etc.)"
    ],
    geographicalScope: "Common baseline for EU and Switzerland (CH): Apply one common baseline to all CH and EU/EEA activities, using the stricter control where rules differ",
    contractorsAndOutsourced: {
      applies: "Yes. The same policy applies whenever contractors build, configure, test, or operate AI on our behalf",
      requirements: "Require contractual flow-down clauses: confidentiality, data use restrictions, security controls, audit rights, incident notice, and no sub-processing without approval",
      extension: "The AI policy extends to vendor-provided and outsourced AI components where the organization maintains operational responsibility or user-facing control"
    },
    rndPrototypes: "Policy applies only after pilot launch or production. R&D activities are not covered until that point"
  },

  principles: [
    {
      name: "Lawfulness & Compliance / Privacy",
      description: "All AI systems must comply with applicable laws, including AI-specific, sectoral, and data protection regulations (e.g., EU AI Act, GDPR)."
    },
    {
      name: "Safety & Security / Robustness",
      description: "AI systems must be designed and tested to minimize risk to health, safety, and operational integrity."
    },
    {
      name: "Fundamental Rights",
      description: "AI systems must be evaluated for their impact on privacy, non-discrimination, freedom of expression, and human dignity."
    },
    {
      name: "Fairness & Non-Discrimination",
      description: "AI output may NOT directly use protected attributes or sensitive personal data to advantage or disadvantage a person unless there is a clear legal basis and explicit approval. Systems must not produce unjustified bias against individuals or groups; fairness audits and bias mitigation are mandatory for high-risk systems. We monitor for discriminatory patterns or disparate impact in matching, recommendations, and career guidance where lawful and feasible, using aggregate analysis and human review. AI scores and recommendations must never be the sole basis for rejecting applicants, suppressing opportunities, or steering users toward materially worse outcomes."
    },
    {
      name: "Transparency",
      description: "Label AI-generated content and AI-assisted recommendations in the UI and relevant emails, including when recommendations are sponsored or personalised. Keep detailed internal documentation for models, prompts, vendors, validation results, and incidents, even if not all details are disclosed externally. AI systems should be transparent, documented, and understandable to relevant stakeholders (users, auditors, regulators)."
    },
    {
      name: "Human Oversight",
      description: "AI may support prioritisation and guidance, but final decisions with significant impact on people must remain with a trained human. Every in-scope AI system must have a named business owner who can pause, override, or retire it. Users and internal teams must have a way to contest or escalate harmful or clearly wrong outputs. Human-in-the-loop or on-the-loop mechanisms must be defined where necessary, especially in high-risk use cases."
    },
    {
      name: "Accountability & Traceability",
      description: "Roles and responsibilities for AI risk, compliance, and decisions must be clearly defined and enforced."
    }
  ],

  governance: {
    managementSystem: "Implement a governance overlay on existing privacy, security, product, and risk processes, consistent with ISO/IEC 42001 and EU AI Act Article 17, including: Risk management process, Data governance process, Technical documentation and audit trails, Supplier and post-market monitoring procedures",
    coreProcesses: "Keep the current five-step AI Flow as the backbone: inventory, inception/submission, design/validate, risk assessment, sign-off. Create a fast-track for low-risk productivity AI and a full stage-gate for customer-facing, high-risk, or internally developed AI",
    steeringCommittee: "Establish an AI Steering Committee to oversee governance, risk, and lifecycle integration. Ensure that AI System Impact Assessments (AISIA) and AI Risk Assessments are conducted and updated throughout the entire AI lifecycle",
    policyReview: "Review and update the AI policy at least annually and when: New AI regulations come into force, A serious AI-related incident or audit occurs, Significant organizational changes are made"
  },

  rolesAndResponsibilities: {
    executiveOwner: "CEO as formal owner and visible sponsor",
    responsibilities: [
      "Ensure alignment with legal and ethical standards",
      "Coordinate policy enforcement across functions",
      "Provide strategic oversight on high-risk systems, incident reviews, and policy revisions",
      "Implement AI systems in compliance with this policy, maintain traceability, logging, and technical documentation",
      "Conduct risk evaluations, compliance checks, and internal audits linked to the AI QMS",
      "Verify data governance, transparency disclosures, and fundamental rights impact alignment",
      "Ensure human oversight, fallback, and post-market monitoring mechanisms are implemented as designed"
    ]
  },

  classification: {
    scheme: "Use the EU AI Act categories as the primary scheme: prohibited, high-risk, transparency/limited-risk, and minimal-risk",
    performedBy: "System/Product Owners before any design, development, deployment, or engagement with third-party vendors, during the Inception stage of the AI lifecycle",
    reviewedBy: "AI Governance and Risk team",
    reEvaluation: "Classifications must be re-evaluated upon major updates or deployment changes",
    tiers: [
      {
        tier: "Tier 1 – High-risk",
        definition: "Covered under EU AI Act Annex III or assessed as high criticality"
      },
      {
        tier: "Tier 2 – Transparency-Only",
        definition: "Subject only to Article 52 (transparency obligations)"
      },
      {
        tier: "Tier 3 – Internal Low-Risk",
        definition: "[To be defined based on internal criteria]"
      }
    ]
  },

  lifecycle: {
    mechanisms: [
      "AI System Impact Assessment (AISIA)",
      "AI Risk Management Process",
      "AI QMS (Quality Management System)",
      "Internal Audits and Management Reviews",
      "Training and Awareness Program"
    ],
    enforcementControls: [
      "Mandatory role-based training and annual acknowledgement",
      "System access, vendor onboarding, and release approvals are gated on completion of required reviews and evidence",
      "Periodic audits and spot checks on systems, prompts, data use, and documentation",
      "Maintain a live (updated) AI inventory with owners, classification, vendors, data categories, approvals, and review dates, and make the signature of the executive owner mandatory for policy compliance"
    ]
  },

  exceptions: {
    policy: "Time-limited exceptions with EMT approval after demonstration of risks and benefits. Only as time-limited exceptions to specific controls where risk is understood and mitigated; no exceptions to legal prohibitions or banned use cases",
    process: "Any exception to this AI Policy must be formally requested via the AI Governance Lead, justified in writing, and approved by the AI Steering Committee",
    escalationTriggers: [
      "Suspected discrimination, rights harm, or credible complaints from candidates, job seekers, recruiters, or customers",
      "Security incidents, privacy incidents, vendor breaches, or unauthorised data sharing with an AI provider",
      "Severe model degradation",
      "Serious incident involving safety or fundamental rights violation",
      "Non-compliance with regulatory requirements discovered during audit",
      "Residual risk classified as High or Critical and not mitigated",
      "Use of AI for a prohibited or unapproved sensitive application"
    ]
  },

  training: {
    requirements: [
      {
        audience: "All employees and long-term contractors",
        content: "acceptable use, data handling, confidentiality, prompt hygiene, and incident reporting"
      },
      {
        audience: "Builders and product owners",
        content: "classification, testing, documentation, vendor controls, bias/fairness, monitoring, and change management"
      },
      {
        audience: "Executives, managing directors, and approvers",
        content: "risk appetite, accountability, exception handling, and sign-off standards"
      },
      {
        audience: "Operational users (such as recruiters, support, sales, and customer success)",
        content: "how to interpret AI outputs, when not to rely on them, and how to escalate problems"
      }
    ],
    note: "Higher training requirements apply to roles with higher exposure to or involvement in AI risk",
    communication: {
      internal: [
        "To all staff via intranet/policy hub, onboarding, mandatory acknowledgement, and manager cascades",
        "Incorporated into onboarding and project planning activities",
        "Supported by regular training and awareness programs",
        "Audited through knowledge checks or training certification logs"
      ],
      external: [
        "To customers and users through privacy notices, product disclosures, FAQs, trust pages, and contractual documentation where relevant",
        "To recruiters and job seekers in-product and in email/UX touchpoints when AI materially supports matching, recommendations, or guidance",
        "To suppliers and contractors through onboarding packs and contract clauses",
        "To the board or executive committee through periodic governance reporting"
      ]
    }
  }
};
