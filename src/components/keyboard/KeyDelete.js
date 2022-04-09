import styled from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";
import { StyledKey } from "./Key";

const StyledKeyDelete = styled(StyledKey)`
  height: 50px;
  width: 20px;
  padding-left: 12px;
  font-size: 33px;
  padding-top: 20px;
  padding-right: 15px;
`;

const KeyDelete = ({ item }) => {
  const { onSelectKey } = useQuizContext();

  const onClick = () => {
    onSelectKey(item.key);
  };

  return <StyledKeyDelete onClick={onClick}>{item.value}</StyledKeyDelete>;
};

export default KeyDelete;
