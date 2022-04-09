import styled from "styled-components";
import Box from "./Box";

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  column-gap: 5px;
`;

const Row = ({ columns }) => {
  return (
    <StyledRow>
      {columns.map((column) => (
        <Box key={`box-${column.rowIndex}-${column.columnIndex}`} column={column} />
      ))}
    </StyledRow>
  );
};

export default Row;
