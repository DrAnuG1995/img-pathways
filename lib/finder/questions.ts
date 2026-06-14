import type { Answers, Question } from "./types";

// Countries Australia recognises (via the AMC) as "competent authorities" for
// the competent authority pathway. (Eligibility also requires certification by
// that authority and practice in that country — confirmed by a follow-up Q.)
export const COMPETENT_AUTHORITY_COUNTRIES = new Set([
  "uk",
  "ireland",
  "usa",
  "canada",
  "new-zealand",
]);

// Specialties with accepted qualifications on the Board's Expedited Specialist
// pathway list as of 19 Jan 2026. Diagnostic radiology is "under assessment".
export const EXPEDITED_SPECIALTIES = new Set([
  "general-practice",
  "anaesthetics",
  "obstetrics-gynaecology",
  "psychiatry",
  "general-medicine",
  "general-paediatrics",
]);

const COUNTRY_OPTIONS = [
  { value: "uk", label: "United Kingdom" },
  { value: "ireland", label: "Ireland" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "other", label: "Another country" },
];

const SPECIALTY_OPTIONS = [
  { value: "general-practice", label: "General practice" },
  { value: "anaesthetics", label: "Anaesthesia" },
  { value: "obstetrics-gynaecology", label: "Obstetrics & gynaecology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "general-medicine", label: "General medicine" },
  { value: "general-paediatrics", label: "General paediatrics" },
  { value: "diagnostic-radiology", label: "Diagnostic radiology" },
  { value: "other", label: "Another specialty" },
];

const seeksGeneral = (a: Answers) =>
  a.seeking === "general" || a.seeking === "unsure";

export const QUESTIONS: Question[] = [
  {
    id: "seeking",
    prompt: "What are you hoping to do in Australia?",
    help: "This sets the whole pathway. You can change it later.",
    options: [
      { value: "general", label: "Work as a doctor", hint: "Seeking general registration" },
      { value: "specialist", label: "Have my specialty recognised", hint: "Seeking specialist registration" },
      { value: "unsure", label: "I'm not sure yet", hint: "We'll point you to the basics" },
    ],
  },
  {
    id: "trainingCountry",
    prompt: "Where did you complete your primary medical qualification?",
    help: "Your basic medical degree — not later specialty training.",
    options: COUNTRY_OPTIONS,
  },
  {
    id: "specialty",
    prompt: "What is your specialty?",
    help: "Some specialties now have a faster, expedited route.",
    showIf: (a) => a.seeking === "specialist",
    options: SPECIALTY_OPTIONS,
  },
  {
    id: "competentAuthorityConfirmed",
    prompt:
      "Are you fully certified by that country's medical authority, and have you practised there?",
    help:
      "For example, full GMC registration in the UK, or board certification and practice in the USA, Canada, Ireland or New Zealand.",
    showIf: (a) =>
      seeksGeneral(a) && COMPETENT_AUTHORITY_COUNTRIES.has(a.trainingCountry ?? ""),
    options: [
      { value: "yes", label: "Yes", hint: "Certified and practised in that country" },
      { value: "no", label: "No / not yet", hint: "Still training, or not certified there" },
    ],
  },
  {
    id: "englishStatus",
    prompt: "Have you met Australia's English language requirement?",
    help: "Accepted tests include IELTS Academic, OET, PTE Academic and TOEFL iBT.",
    options: [
      { value: "met", label: "Yes, I have a current test result" },
      { value: "exempt", label: "I think I'm exempt", hint: "e.g. trained and practised in English" },
      { value: "not-yet", label: "Not yet" },
    ],
  },
];

/** The questions that apply given the current answers (respecting showIf). */
export function visibleQuestions(answers: Answers): Question[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers));
}
