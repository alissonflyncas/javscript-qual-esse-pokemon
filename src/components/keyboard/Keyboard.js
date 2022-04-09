import { Delete } from "@styled-icons/feather";
import styled from "styled-components";
import Key from "./Key";
import KeyEnter from "./KeyEnter";
import KeyDelete from "./KeyDelete";

const StyledKeyboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-center: center;
  margin-bottom: 20px;
  row-gap: 8px;
  color: white;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  column-gap: 8px;
`;

const keys = {
  q: { value: "Q", line: 0, pos: 0, colors: [], enabled: true },
  w: { value: "W", line: 0, pos: 1, colors: [], enabled: true },
  e: { value: "E", line: 0, pos: 2, colors: [], enabled: true },
  r: { value: "R", line: 0, pos: 3, colors: [], enabled: true },
  t: { value: "T", line: 0, pos: 4, colors: [], enabled: true },
  y: { value: "Y", line: 0, pos: 5, colors: [], enabled: true },
  u: { value: "U", line: 0, pos: 6, colors: [], enabled: true },
  i: { value: "I", line: 0, pos: 7, colors: [], enabled: true },
  o: { value: "O", line: 0, pos: 8, colors: [], enabled: true },
  p: { value: "P", line: 0, pos: 9, colors: [], enabled: true },
  a: { value: "A", line: 1, pos: 0, colors: [], enabled: true },
  s: { value: "S", line: 1, pos: 1, colors: [], enabled: true },
  d: { value: "D", line: 1, pos: 2, colors: [], enabled: true },
  f: { value: "F", line: 1, pos: 3, colors: [], enabled: true },
  g: { value: "G", line: 1, pos: 4, colors: [], enabled: true },
  h: { value: "H", line: 1, pos: 5, colors: [], enabled: true },
  j: { value: "J", line: 1, pos: 6, colors: [], enabled: true },
  k: { value: "K", line: 1, pos: 7, colors: [], enabled: true },
  l: { value: "L", line: 1, pos: 8, colors: [], enabled: true },
  delete: { value: "<", line: 1, pos: 9, colors: [], enabled: true },
  z: { value: "Z", line: 2, pos: 0, colors: [], enabled: true },
  x: { value: "X", line: 2, pos: 1, colors: [], enabled: true },
  c: { value: "C", line: 2, pos: 2, colors: [], enabled: true },
  v: { value: "V", line: 2, pos: 3, colors: [], enabled: true },
  b: { value: "B", line: 2, pos: 4, colors: [], enabled: true },
  n: { value: "N", line: 2, pos: 5, colors: [], enabled: true },
  m: { value: "M", line: 2, pos: 6, colors: [], enabled: true },
  enter: { value: "ENTER", line: 2, pos: 7, colors: [], enabled: true },
};

const keybordKeys = Object.keys(keys).reduce((prev, curr) => {
  const line = keys[curr].line;
  if (!prev[line]) prev[line] = [];
  prev[line].push({ ...keys[curr], key: curr });
  return prev;
}, {});

const KeyWrapper = ({ id, item }) => {
  switch (id) {
    case "enter":
      return <KeyEnter item={item} />;
    case "delete":
      return <KeyDelete item={item} />;
    default:
      return <Key item={item} />;
  }
};

const Keyboard = () => (
  <StyledKeyboard>
    {Object.keys(keybordKeys).map((row) => (
      <StyledRow key={row}>
        {keybordKeys[row].map((column) => (
          <KeyWrapper key={column.key} id={column.key} item={column} />
        ))}
      </StyledRow>
    ))}
  </StyledKeyboard>
);

export default Keyboard;
