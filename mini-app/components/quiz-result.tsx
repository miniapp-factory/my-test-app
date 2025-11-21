"use client";

import { useQuiz } from "./quiz-context";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function QuizResult({ reset }: { reset: () => void }) {
  const { answers } = useQuiz();

  const counts: Record<string, number> = {
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  };

  answers.forEach((a) => {
    counts[a] = (counts[a] ?? 0) + 1;
  });

  const maxAnimal = Object.entries(counts).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0] as string;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are a {maxAnimal}!</h2>
      <img
        src={`/${maxAnimal}.png`}
        alt={maxAnimal}
        width={256}
        height={256}
        className="rounded-md"
      />
      <Share text={`I am a ${maxAnimal}! ${url}`} />
      <button
        className="mt-4 rounded-md bg-secondary text-secondary-foreground py-2 px-4"
        onClick={reset}
      >
        Retake Quiz
      </button>
    </div>
  );
}
