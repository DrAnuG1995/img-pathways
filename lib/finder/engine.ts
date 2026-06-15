import type { Answers, Confidence, Outcome, PathwayKey, Question } from "./types";
import {
  COMPETENT_AUTHORITY_COUNTRIES,
  EXPEDITED_SPECIALTIES,
  visibleQuestions,
} from "./questions";
import { OUTCOMES, englishNoteFor } from "./outcomes";

/** The first visible, unanswered question, or null when the survey is done. */
export function nextQuestion(answers: Answers): Question | null {
  return visibleQuestions(answers).find((q) => !answers[q.id]) ?? null;
}

export function isComplete(answers: Answers): boolean {
  return nextQuestion(answers) === null;
}

/** Progress against the currently-visible question set (branching aware). */
export function progress(answers: Answers): { answered: number; total: number } {
  const visible = visibleQuestions(answers);
  return {
    answered: visible.filter((q) => answers[q.id]).length,
    total: visible.length,
  };
}

/** Pure routing: answers → the pathway that best fits. A guide, not a ruling. */
export function resolveOutcome(answers: Answers): Outcome {
  const base = pickBase(answers);
  const out: Outcome = {
    ...base,
    englishNote: englishNoteFor(answers.englishStatus),
    confidence: computeConfidence(answers, base.pathway),
    sourceIds: [...base.sourceIds],
  };

  // Diagnostic radiology is under assessment for the expedited pathway, surface it.
  if (base.pathway === "specialist" && answers.specialty === "diagnostic-radiology") {
    out.rationale +=
      " Note: diagnostic radiology is being assessed for the Expedited Specialist pathway, check for updates.";
    if (!out.sourceIds.includes("ahpra-expedited-2026")) {
      out.sourceIds.push("ahpra-expedited-2026");
    }
  }

  return out;
}

function pickBase(a: Answers): Outcome {
  const fromCountry = COMPETENT_AUTHORITY_COUNTRIES.has(a.trainingCountry ?? "");

  if (a.seeking === "specialist") {
    if (a.specialty && EXPEDITED_SPECIALTIES.has(a.specialty) && fromCountry) {
      return OUTCOMES["expedited-specialist"];
    }
    return OUTCOMES["specialist"];
  }

  // general or unsure
  if (fromCountry) return OUTCOMES["competent-authority"];
  return OUTCOMES["standard"];
}

function computeConfidence(a: Answers, pathway: PathwayKey): Confidence {
  if (a.seeking === "unsure") return "needs-review";
  switch (pathway) {
    case "competent-authority":
      // Country matched, but eligibility also needs certification + practice there.
      return a.competentAuthorityConfirmed === "yes" ? "clear" : "needs-review";
    case "expedited-specialist":
      // Specialty matched, but the exact qualification must be on the accepted list.
      return "needs-review";
    case "standard":
    case "specialist":
    default:
      return "likely";
  }
}
