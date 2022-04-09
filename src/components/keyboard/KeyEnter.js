import styled from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";
import { StyledKey } from "./Key";

const StyledKeyEnter = styled(StyledKey)`
  height: 50px;
  width: 120px;
  padding-left: 12px;
`;

const KeyEnter = ({ item }) => {
  const { quiz, current, sendQuiz } = useQuizContext();

  return (
    <StyledKeyEnter
      disabled={quiz.length === 0 || !quiz[current.row].every((a) => a.char)}
      onClick={sendQuiz}
      id="send-quiz"
    >
      {item.value}
    </StyledKeyEnter>
  );
};

export default KeyEnter;
