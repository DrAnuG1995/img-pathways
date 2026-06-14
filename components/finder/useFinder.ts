"use client";

import { useCallback, useMemo, useState } from "react";
import type { Answers, QuestionId } from "@/lib/finder/types";
import { isComplete, nextQuestion, progress, resolveOutcome } from "@/lib/finder/engine";

/**
 * Owns the finder's answer state. All decisions are pure selectors over the
 * engine — this hook holds no domain logic, only React state + history for the
 * Back button.
 */
export function useFinder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<QuestionId[]>([]);

  const current = useMemo(() => nextQuestion(answers), [answers]);
  const done = useMemo(() => isComplete(answers), [answers]);
  const prog = useMemo(() => progress(answers), [answers]);
  const outcome = useMemo(() => (done ? resolveOutcome(answers) : null), [answers, done]);

  const answer = useCallback((id: QuestionId, value: string) => {
    setHistory((h) => [...h, id]);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const back = useCallback(() => {
    setHistory((h) => {
      if (!h.length) return h;
      const last = h[h.length - 1];
      setAnswers((prev) => {
        const next = { ...prev };
        delete next[last];
        return next;
      });
      return h.slice(0, -1);
    });
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setHistory([]);
  }, []);

  return {
    answers,
    current,
    done,
    outcome,
    progress: prog,
    canGoBack: history.length > 0,
    answer,
    back,
    reset,
  };
}
