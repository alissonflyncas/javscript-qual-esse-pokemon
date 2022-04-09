import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useQuizContext } from "../../contexts/QuizContext";
import { flashFadeAnimation } from "../styles";

const StyledBox = styled.div`
  height: 80px;
  width: 80px;
  border: white;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25px;
  text-transform: uppercase;
  background-color: ${(props) => props.color};
  font-family: Pokemon Hollow;

  :focus {
    background-color: blue;
    -webkit-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -moz-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -ms-animation: ${flashFadeAnimation} 2.5s linear infinite;
    -o-animation: ${flashFadeAnimation} 2.5s linear infinite;
    animation: ${flashFadeAnimation} 2.5s linear infinite;
  }
`;

const Box = ({ column: { rowIndex, columnIndex, color, realChar } }) => {
  const ref = useRef();
  const { grid, refs, current, onSelectKey, updateCurrent, addRef } =
    useQuizContext();
  const { row, column } = current;

  useEffect(() => {
    if (row === rowIndex && column === columnIndex) {
      ref.current && ref.current.focus();
    }
  }, [row, column, rowIndex, columnIndex]);

  useEffect(() => {
    if (!ref.current) return;
    addRef(rowIndex, columnIndex, ref.current);
  }, [rowIndex, columnIndex, addRef]);

  const onKeyDown = (e) => {
    if (e.code.startsWith("Key")) {
      const col =
        grid.columns - 1 > columnIndex ? columnIndex + 1 : columnIndex;
      refs[rowIndex][col].focus();
      onSelectKey(e.key?.toLowerCase());
    }

    if (e.code === "ArrowRight") {
      const col =
        grid.columns - 1 > columnIndex ? columnIndex + 1 : columnIndex;
      refs[rowIndex][col].focus();
      return updateCurrent(row, col);
    }

    if (e.code === "ArrowLeft") {
      const col = columnIndex > 0 ? columnIndex - 1 : 0;
      console.log("column", columnIndex, rowIndex, refs[rowIndex][col]);

      refs[rowIndex][col].focus();
      return updateCurrent(row, col);
    }

    if (["Backspace", "Enter"].includes(e.code)) {
      onSelectKey(e.code);
    }
  };

  return (
    <StyledBox
      ref={ref}
      active={row === rowIndex && column === columnIndex}
      color={color}
      onKeyDown={onKeyDown}
      aria-disabled={row !== rowIndex}
      {...(row === rowIndex && { tabIndex: "-1" })}
    >
      {realChar}
    </StyledBox>
  );
};

export default Box;
