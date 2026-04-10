import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { aiPolicyData } from '../data/aiPolicyData';

export async function generateAIPolicyDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "AI Policy – Completed Document with Executive Choices",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Document Control Section
          new Paragraph({
            text: "Document Control",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          // Document Control Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Field", bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Details", bold: true })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Version")] }),
                  new TableCell({ children: [new Paragraph(aiPolicyData.documentControl.version)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Date")] }),
                  new TableCell({ children: [new Paragraph(aiPolicyData.documentControl.date)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Owner")] }),
                  new TableCell({ children: [new Paragraph(aiPolicyData.documentControl.owner)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Approved by")] }),
                  new TableCell({ children: [new Paragraph(aiPolicyData.documentControl.approvedBy)] }),
                ],
              }),
            ],
          }),

          // Purpose Section
          new Paragraph({
            text: "Purpose",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: aiPolicyData.purpose.description,
            spacing: { after: 200 },
          }),

          ...aiPolicyData.purpose.items.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          // Scope Section
          new Paragraph({
            text: "Scope",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "AI Systems Covered:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          ...aiPolicyData.scope.aiSystemsCovered.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            text: "Roles and Functions:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          ...aiPolicyData.scope.rolesAndFunctions.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            text: "Geographical Scope:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.scope.geographicalScope,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Contractors and Outsourced Teams:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.scope.contractorsAndOutsourced.applies,
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.scope.contractorsAndOutsourced.requirements,
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.scope.contractorsAndOutsourced.extension,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "R&D Prototypes:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.scope.rndPrototypes,
            spacing: { after: 200 },
          }),

          // Organizational Principles Section
          new Paragraph({
            text: "Organizational Principles for AI",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "The organization commits to the following six mandatory principles for responsible AI:",
            spacing: { after: 200 },
          }),

          // Principles Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Principle", bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              ...aiPolicyData.principles.map(
                (principle) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(principle.name)] }),
                      new TableCell({ children: [new Paragraph(principle.description)] }),
                    ],
                  })
              ),
            ],
          }),

          // Governance Commitments Section
          new Paragraph({
            text: "Governance Commitments",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "Management System:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.governance.managementSystem,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Core Governance Processes:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.governance.coreProcesses,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "AI Steering Committee:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.governance.steeringCommittee,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Policy Review:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.governance.policyReview,
            spacing: { after: 200 },
          }),

          // Roles and Responsibilities Section
          new Paragraph({
            text: "Roles and Responsibilities",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "Executive Owner:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.rolesAndResponsibilities.executiveOwner,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "The organization shall define clear and accountable roles for managing AI systems and enforcing this policy in order to:",
            spacing: { after: 100 },
          }),

          ...aiPolicyData.rolesAndResponsibilities.responsibilities.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          // AI System Classification Section
          new Paragraph({
            text: "AI System Classification and Risk-Based Controls",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "AI systems shall be classified based on legal obligations, internal standards and policies, and impact level. This classification determines the required controls and documentation.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Classification Scheme:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.classification.scheme,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: `This classification shall be performed by ${aiPolicyData.classification.performedBy}. AI system classification shall be reviewed and approved by the ${aiPolicyData.classification.reviewedBy}. ${aiPolicyData.classification.reEvaluation}`,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Classification Tiers:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          // Classification Tiers Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Tier", bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Definition", bold: true })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              ...aiPolicyData.classification.tiers.map(
                (tier) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(tier.tier)] }),
                      new TableCell({ children: [new Paragraph(tier.definition)] }),
                    ],
                  })
              ),
            ],
          }),

          // Lifecycle Integration Section
          new Paragraph({
            text: "Lifecycle Integration and Enforcement Mechanisms",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "The AI Policy shall be operationalized through the following mechanisms:",
            spacing: { after: 100 },
          }),

          ...aiPolicyData.lifecycle.mechanisms.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            text: "Enforcement Controls:",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          ...aiPolicyData.lifecycle.enforcementControls.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          // Exceptions and Escalation Section
          new Paragraph({
            text: "Exceptions and Escalation",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "Policy Exceptions",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.exceptions.process,
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: "Exception Policy:",
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: aiPolicyData.exceptions.policy,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Escalation Triggers",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: "The following events require mandatory escalation to the AI Steering Committee:",
            spacing: { after: 100 },
          }),

          ...aiPolicyData.exceptions.escalationTriggers.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          // Training and Communication Plan Section
          new Paragraph({
            text: "Training and Communication Plan",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "Training Requirements",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: "The organization commits to role-based training as follows:",
            spacing: { after: 100 },
          }),

          ...aiPolicyData.training.requirements.map(
            (req, index) =>
              new Paragraph({
                text: `${index + 1}. ${req.audience}: ${req.content}`,
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            children: [new TextRun({ text: aiPolicyData.training.note, italics: true })],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Communication Plan",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),

          new Paragraph({
            text: "The AI Policy shall be communicated:",
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: "Internally:", bold: true })],
            spacing: { before: 100, after: 100 },
          }),

          ...aiPolicyData.training.communication.internal.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            children: [new TextRun({ text: "Externally (light version):", bold: true })],
            spacing: { before: 200, after: 100 },
          }),

          ...aiPolicyData.training.communication.external.map(
            (item) =>
              new Paragraph({
                text: item,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),
        ],
      },
    ],
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'AI_Policy_Document.docx');
}
