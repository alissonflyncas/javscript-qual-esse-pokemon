import styled from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";

export const StyledKey = styled.div.attrs({
  as: "button",
})`
  height: 50px;
  width: 50px;
  border: white;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25px;
  font-family: Pokemon Hollow;
  background-color: write;

  color: #444;
  border: 1px solid #ccc;
  background: #ddd;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  vertical-align: middle;
  max-width: 100px;
  padding: 5px;
  text-align: center;

  :active {
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
  }
`;

const Key = ({ item }) => {
  const { onSelectKey } = useQuizContext();

  const onClick = () => {
    onSelectKey(item.key);
  };

  return <StyledKey onClick={onClick}>{item.value}</StyledKey>;
};

export default Key;
