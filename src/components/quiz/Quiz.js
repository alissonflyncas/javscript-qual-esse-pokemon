import styled from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";
import { flashFadeAnimation } from "../styles";
import Row from "./Row";

const Button = styled.button`
  color: white;
  background-color: #1e58ca;
  border-color: #1b53c2;
  width: 120px;
  height: 40px;
  margin-bottom: 16px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;

  :disabled {
    background-color: #34373a;
    cursor: unset;
    border: white;
  }

  :enabled {
    -webkit-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -moz-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -ms-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -o-animation: ${flashFadeAnimation} 2.5s linear infinite;
    animation: ${flashFadeAnimation} 2.5s linear infinite;
  }
`;

const StyledQuiz = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  color: white;
  row-gap: 5px;
`;

const Quiz = () => {
  const { quiz } = useQuizContext();

  return (
    <StyledQuiz>
      {quiz.map((columns, i) => (
        <Row key={"item-" + i} columns={columns} />
      ))}
    </StyledQuiz>
  );
};

export default Quiz;
