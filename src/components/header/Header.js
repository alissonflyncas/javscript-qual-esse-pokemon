import styled from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";
import { LEVELS } from "../const/LEVELS";

const StyledTitle = styled.h1`
  font-family: Pokemon Hollow;
  background: write;
  margin-top: 20px;
`;

const StyledSelect = styled.select`
  font-family: Pokemon Hollow;
  font-size: 25px;
  text-align: center;
`;

const StyledOption = styled.option`
  font-family: Pokemon Hollow;
  text-align: center;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-center: center;
`;

const levelMap = {
  [LEVELS.DEFAULT]: "Selecione a dificuldade do jogo",
  [LEVELS.EASY]: "Fácil",
  [LEVELS.MEDIUM]: "Moderado",
  [LEVELS.HARD]: "Difícil",
  [LEVELS.CAZE]: "Cazemito",
};

const Header = () => {
  const { level, setLevel } = useQuizContext();

  const onChange = (e) => setLevel(Number(e.target.value));

  return (
    <StyledHeader>
      <StyledTitle>Iiih Mané.. Qual é esse Pokémon?</StyledTitle>
      <StyledSelect onChange={onChange} value={level}>
        {Object.keys(LEVELS).map((n) => (
          <StyledOption
            key={LEVELS[n]}
            selected={LEVELS[n] === level}
            value={LEVELS[n]}
          >
            {levelMap[LEVELS[n]]}
          </StyledOption>
        ))}
      </StyledSelect>
    </StyledHeader>
  );
};

export default Header;
