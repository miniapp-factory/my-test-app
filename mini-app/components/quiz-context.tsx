import { createContext, useContext, useState, ReactNode } from "react";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface QuizContextValue {
  answers: Animal[];
  setAnswer: (index: number, animal: Animal) => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Animal[]>([]);

  const setAnswer = (index: number, animal: Animal) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = animal;
      return newAnswers;
    });
  };

  const reset = () => setAnswers([]);

  return (
    <QuizContext.Provider value={{ answers, setAnswer, reset }}>
      {children}
    </QuizContext.Provider>
  );
}
