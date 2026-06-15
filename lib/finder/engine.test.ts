import { describe, it, expect } from "vitest";
import { nextQuestion, isComplete, progress, resolveOutcome } from "./engine";
import { resolveSource } from "@/lib/content/sources";
import type { Answers, PathwayKey } from "./types";

describe("nextQuestion / branching", () => {
  it("starts with the 'seeking' question", () => {
    expect(nextQuestion({})?.id).toBe("seeking");
  });

  it("asks specialty only when seeking specialist", () => {
    const general: Answers = { seeking: "general", trainingCountry: "other" };
    expect(general).not.toHaveProperty("specialty");
    // specialty question should never surface for a general seeker
    let a: Answers = { seeking: "general", trainingCountry: "other" };
    while (!isComplete(a)) {
      const q = nextQuestion(a)!;
      expect(q.id).not.toBe("specialty");
      a = { ...a, [q.id]: q.options[0].value };
    }
  });

  it("asks the competent-authority confirmation only for general seekers from a CA country", () => {
    const a: Answers = { seeking: "general", trainingCountry: "uk" };
    expect(nextQuestion(a)?.id).toBe("competentAuthorityConfirmed");

    const other: Answers = { seeking: "general", trainingCountry: "other" };
    expect(nextQuestion(other)?.id).toBe("englishStatus");
  });

  it("reports branching-aware progress", () => {
    const a: Answers = { seeking: "specialist", trainingCountry: "uk", specialty: "psychiatry" };
    const p = progress(a);
    expect(p.answered).toBe(3);
    expect(p.total).toBe(4); // seeking, trainingCountry, specialty, englishStatus
  });
});

describe("resolveOutcome, routing", () => {
  const cases: { name: string; answers: Answers; expected: PathwayKey; confidence?: string }[] = [
    {
      name: "non-CA country, general → Standard",
      answers: { seeking: "general", trainingCountry: "other", englishStatus: "not-yet" },
      expected: "standard",
    },
    {
      name: "UK general, certified + practised → Competent Authority (clear)",
      answers: { seeking: "general", trainingCountry: "uk", competentAuthorityConfirmed: "yes", englishStatus: "exempt" },
      expected: "competent-authority",
      confidence: "clear",
    },
    {
      name: "UK general, not certified → Competent Authority (needs-review)",
      answers: { seeking: "general", trainingCountry: "uk", competentAuthorityConfirmed: "no", englishStatus: "met" },
      expected: "competent-authority",
      confidence: "needs-review",
    },
    {
      name: "UK psychiatrist → Expedited Specialist (needs-review)",
      answers: { seeking: "specialist", trainingCountry: "uk", specialty: "psychiatry", englishStatus: "met" },
      expected: "expedited-specialist",
      confidence: "needs-review",
    },
    {
      name: "Ireland GP → Expedited Specialist",
      answers: { seeking: "specialist", trainingCountry: "ireland", specialty: "general-practice", englishStatus: "met" },
      expected: "expedited-specialist",
    },
    {
      name: "UK specialist in a non-expedited specialty → Specialist",
      answers: { seeking: "specialist", trainingCountry: "uk", specialty: "other", englishStatus: "met" },
      expected: "specialist",
    },
    {
      name: "expedited specialty but non-CA country → Specialist",
      answers: { seeking: "specialist", trainingCountry: "other", specialty: "anaesthetics", englishStatus: "met" },
      expected: "specialist",
    },
    {
      name: "unsure from non-CA country → Standard (needs-review)",
      answers: { seeking: "unsure", trainingCountry: "other", englishStatus: "not-yet" },
      expected: "standard",
      confidence: "needs-review",
    },
  ];

  it.each(cases)("$name", ({ answers, expected, confidence }) => {
    const out = resolveOutcome(answers);
    expect(out.pathway).toBe(expected);
    if (confidence) expect(out.confidence).toBe(confidence);
  });

  it("tailors the English note from englishStatus", () => {
    expect(resolveOutcome({ seeking: "general", trainingCountry: "other", englishStatus: "not-yet" }).englishNote)
      .toMatch(/IELTS|OET/);
    expect(resolveOutcome({ seeking: "general", trainingCountry: "other", englishStatus: "met" }).englishNote)
      .toMatch(/two years/i);
  });

  it("flags diagnostic radiology as under assessment", () => {
    const out = resolveOutcome({ seeking: "specialist", trainingCountry: "uk", specialty: "diagnostic-radiology", englishStatus: "met" });
    expect(out.pathway).toBe("specialist");
    expect(out.rationale).toMatch(/under assessment|being assessed/i);
    expect(out.sourceIds).toContain("ahpra-expedited-2026");
  });

  it("every outcome's sources resolve in the registry", () => {
    const all: Answers[] = cases.map((c) => c.answers);
    for (const answers of all) {
      const out = resolveOutcome(answers);
      expect(out.sourceIds.length).toBeGreaterThan(0);
      for (const sid of out.sourceIds) {
        expect(resolveSource(sid), `unknown source ${sid}`).not.toBeNull();
      }
    }
  });
});
