// ---------------------------------------------------------------------------
// Pathway-finder engine — types.
//
// The survey is data (QUESTIONS). The routing is a pure function (resolveOutcome).
// Outcomes are data (OUTCOMES) and carry their own citations. No logic lives in
// the React layer — the UI only renders questions and the resolved outcome.
//
// IMPORTANT: the finder is a GUIDE, not a determination. Outcomes carry a
// `confidence` flag and every result links to the official source and tells the
// user to confirm with AHPRA / the AMC.
// ---------------------------------------------------------------------------

export type PathwayKey =
  | "standard"
  | "competent-authority"
  | "specialist"
  | "expedited-specialist";

export type QuestionId =
  | "seeking"
  | "trainingCountry"
  | "specialty"
  | "competentAuthorityConfirmed"
  | "englishStatus";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export type Answers = Partial<Record<QuestionId, string>>;

export interface Question {
  id: QuestionId;
  prompt: string;
  help?: string;
  options: Option[];
  /** Only ask this question when the predicate over prior answers is true. */
  showIf?: (a: Answers) => boolean;
}

export type Confidence = "clear" | "likely" | "needs-review";

export interface Outcome {
  pathway: PathwayKey;
  headline: string;
  rationale: string;
  requiredExams: string[];
  englishNote: string;
  visaNote: string;
  nextSteps: string[];
  links: { label: string; href: string }[];
  pathwayHref: string; // the page to route the user to
  confidence: Confidence;
  sourceIds: string[];
}
