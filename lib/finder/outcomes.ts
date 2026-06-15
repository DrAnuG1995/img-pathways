import type { Outcome, PathwayKey } from "./types";

// Base outcome content per pathway. `englishNote`, `confidence` and the rationale
// are tailored at resolve time from the user's answers. Each outcome cites the
// official source(s) it rests on.
export const OUTCOMES: Record<PathwayKey, Outcome> = {
  standard: {
    pathway: "standard",
    headline: "The Standard pathway looks like your route",
    rationale:
      "Your primary qualification isn't from a country Australia recognises as a competent authority, so you'd sit the AMC's assessments.",
    requiredExams: [
      "AMC CAT MCQ examination (multiple-choice, knowledge)",
      "AMC Clinical examination OR a Workplace-Based Assessment (WBA)",
    ],
    englishNote: "",
    visaNote:
      "You'll usually need employer sponsorship (e.g. the Skills in Demand subclass 482 visa). Migration is regulated, confirm with a registered MARA agent.",
    nextSteps: [
      "Create an AMC portfolio and verify your qualifications (primary source verification).",
      "Sit the AMC CAT MCQ exam.",
      "Complete the AMC Clinical exam or an accredited Workplace-Based Assessment.",
      "Apply to the Medical Board for provisional, then general, registration.",
    ],
    links: [
      { label: "Standard pathway in detail", href: "/pathways/standard" },
      { label: "AMC exams & assessment", href: "/pathways/standard" },
      { label: "English requirements", href: "/english" },
      { label: "Visas & immigration", href: "/visas" },
    ],
    pathwayHref: "/pathways/standard",
    confidence: "likely",
    sourceIds: ["mba-standard", "amc-standard-assessments", "mba-english", "homeaffairs-482"],
  },

  "competent-authority": {
    pathway: "competent-authority",
    headline: "The Competent Authority pathway looks like your route",
    rationale:
      "You trained and are certified in a country Australia recognises as a competent authority, so you generally don't sit the AMC exams.",
    requiredExams: ["No AMC exams required on this pathway"],
    englishNote: "",
    visaNote:
      "You'll usually need employer sponsorship (e.g. the Skills in Demand subclass 482 visa). Migration is regulated, confirm with a registered MARA agent.",
    nextSteps: [
      "Confirm your competent-authority certificate meets the Board's requirements.",
      "Secure a position with an accredited supervisor.",
      "Apply for provisional registration and complete 12 months of supervised practice.",
      "Apply for general registration.",
    ],
    links: [
      { label: "Competent Authority pathway in detail", href: "/pathways/competent-authority" },
      { label: "Registration types", href: "/registration" },
      { label: "English requirements", href: "/english" },
      { label: "Visas & immigration", href: "/visas" },
    ],
    pathwayHref: "/pathways/competent-authority",
    confidence: "likely",
    sourceIds: ["mba-competent-authority", "mba-ca-provisional", "mba-english", "homeaffairs-482"],
  },

  specialist: {
    pathway: "specialist",
    headline: "The Specialist pathway looks like your route",
    rationale:
      "You hold an overseas specialist qualification, so the relevant Australian specialist college assesses how comparable it is.",
    requiredExams: [
      "Specialist college assessment of comparability (substantially / partially / not comparable)",
      "Any college-required exams, upskilling or supervised practice",
    ],
    englishNote: "",
    visaNote:
      "Specialist roles are often employer-sponsored, including 'area of need' positions. Migration is regulated, confirm with a registered MARA agent.",
    nextSteps: [
      "Apply to the AMC for primary source verification of your qualifications.",
      "Apply to the relevant specialist college for a comparability assessment.",
      "Complete any college-required exams, upskilling or supervised practice.",
      "Apply to the Medical Board for specialist registration.",
    ],
    links: [
      { label: "Specialist pathway in detail", href: "/pathways/specialist" },
      { label: "Specialist colleges", href: "/colleges" },
      { label: "English requirements", href: "/english" },
      { label: "Visas & immigration", href: "/visas" },
    ],
    pathwayHref: "/pathways/specialist",
    confidence: "likely",
    sourceIds: ["mba-specialist", "mba-specialist-recognition", "mba-english"],
  },

  "expedited-specialist": {
    pathway: "expedited-specialist",
    headline: "You may be eligible for the Expedited Specialist pathway",
    rationale:
      "Your specialty has accepted qualifications on the Board's Expedited Specialist pathway list. If your specific qualification is listed, you skip the college comparability assessment.",
    requiredExams: [
      "No comparability assessment and no college training program",
      "6 months supervised practice, plus cultural safety education, orientation and workplace-based assessments",
    ],
    englishNote: "",
    visaNote:
      "These roles are typically employer-sponsored. Migration is regulated, confirm with a registered MARA agent.",
    nextSteps: [
      "Check the Board's Expedited Specialist pathway: accepted qualifications list for your exact qualification.",
      "Secure an approved position with a supervisor.",
      "Apply to the Medical Board for specialist registration via the expedited pathway.",
      "Complete 6 months of supervised practice and the required assessments.",
    ],
    links: [
      { label: "Expedited Specialist pathway in detail", href: "/pathways/expedited-specialist" },
      { label: "Specialist colleges", href: "/colleges" },
      { label: "English requirements", href: "/english" },
      { label: "Visas & immigration", href: "/visas" },
    ],
    pathwayHref: "/pathways/expedited-specialist",
    confidence: "needs-review",
    sourceIds: ["mba-expedited-specialist", "ahpra-expedited-2026", "mba-english"],
  },
};

export function englishNoteFor(status: string | undefined): string {
  switch (status) {
    case "met":
      return "You've indicated you meet the English requirement. Keep your test result current, results are generally valid for two years.";
    case "exempt":
      return "You may be exempt from sitting an English test if you meet the registration standard's other criteria. Confirm your situation against the English language skills standard.";
    case "not-yet":
      return "You'll need to meet the English language requirement. Accepted tests include IELTS Academic, OET, PTE Academic and TOEFL iBT.";
    default:
      return "Check the English language skills registration standard for accepted tests and scores.";
  }
}
