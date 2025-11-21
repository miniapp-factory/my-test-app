"use client";

import { useState } from "react";
import type { Animal } from "./quiz-context";
import { QuizProvider, useQuiz } from "./quiz-context";
import QuizResult from "./quiz-result";

const questions = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grain", animal: "horse" },
    ],
  },
  {
    text: "Which activity do you enjoy most?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running long distances", animal: "horse" },
    ],
  },
  {
    text: "What is your preferred living environment?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Burrow", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Curl up", animal: "cat" },
      { text: "Run away", animal: "dog" },
      { text: "Hide", animal: "fox" },
      { text: "Hide in a nest", animal: "hamster" },
      { text: "Run away", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite color?",
    options: [
      { text: "Black", animal: "cat" },
      { text: "Brown", animal: "dog" },
      { text: "Orange", animal: "fox" },
      { text: "White", animal: "hamster" },
      { text: "Grey", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}

function QuizContent() {
  const { setAnswer, reset } = useQuiz();
  const [current, setCurrent] = useState(0);

  const handleSelect = (animal: Animal) => {
    setAnswer(current, animal as any);
    setCurrent((c) => c + 1);
  };

  if (current < questions.length) {
    const q = questions[current];
    const shuffled = shuffleArray(q.options);
    return (
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">{q.text}</h2>
        <div className="grid gap-2">
          {shuffled.map((opt, idx) => (
            <button
              key={idx}
              className="w-full rounded-md bg-primary text-primary-foreground py-2"
              onClick={() => handleSelect(opt.animal)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return <QuizResult reset={reset} />;
}
