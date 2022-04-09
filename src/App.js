import styled from "styled-components";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import Quiz from "./components/quiz/Quiz";
import { QuizPostProvider } from "./contexts/QuizContext";

const StyledApp = styled.div`
  background-color: #070707e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  color: white;
  row-gap: 5px;
`;

function App() {
  return (
    <StyledApp>
      <QuizPostProvider>
        <Header />
        <Quiz />
        <Keyboard />
      </QuizPostProvider>
    </StyledApp>
  );
}

export default App;
