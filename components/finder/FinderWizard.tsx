"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFinder } from "./useFinder";
import ResultCard from "./ResultCard";
import type { Question } from "@/lib/finder/types";

export default function FinderWizard() {
  const finder = useFinder();
  const { current, done, outcome, progress, canGoBack, answer, back, reset } = finder;

  const pct = progress.total ? Math.round((progress.answered / progress.total) * 100) : 0;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      {!done && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              Question {progress.answered + 1} of {progress.total}
            </span>
            {canGoBack && (
              <button onClick={back} className="underline hover:text-primary">
                ← Back
              </button>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done && current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <QuestionStep question={current} onAnswer={(v) => answer(current.id, v)} />
          </motion.div>
        ) : (
          outcome && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <ResultCard outcome={outcome} answers={finder.answers} onReset={reset} />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestionStep({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{question.prompt}</h2>
      {question.help && <p className="mt-2 text-sm text-muted">{question.help}</p>}
      <div className="mt-6 space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="group flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 text-left transition hover:border-primary hover:bg-primary-soft"
          >
            <span>
              <span className="block font-medium text-ink">{opt.label}</span>
              {opt.hint && <span className="block text-sm text-muted">{opt.hint}</span>}
            </span>
            <span
              aria-hidden
              className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
