import { useCallback, useEffect } from "react";
import { useQuizContext } from "../../contexts/QuizContext";
import { verbs } from "./verbs";

const useQuiz = () => {
  const { step, quiz } = useQuizContext();


  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  return { updateQuiz };
};

export default useQuiz;
