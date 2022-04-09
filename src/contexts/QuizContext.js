import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../components/const/COLORS";
import { GAME_STATE } from "../components/const/GAME_STATE";
import { LEVELS } from "../components/const/LEVELS";
import { verbs } from "../components/quiz/verbs";
import { pokemons } from "../components/words/pokemons";
import { replaceSpecialChars } from "../utils/replaceSpecialChars";

const optionsWordByLevel = {
  [LEVELS.EASY]: [3, 4],
  [LEVELS.MEDIUM]: [4, 5, 6],
  [LEVELS.HARD]: [6, 7],
  [LEVELS.CAZE]: [5, 6, 7, 8, 9, 10, 11, 12],
};

const gridSizeByLevel = {
  [LEVELS.EASY]: 5,
  [LEVELS.MEDIUM]: 6,
  [LEVELS.HARD]: 5,
  [LEVELS.CAZE]: 6,
};

export const QuizDefaultValues = {
  word: "",
  quiz: [],
  refs: {},
  grid: { rows: 0, columns: 0 },
  level: LEVELS.DEFAULT,
  current: { row: 0, column: 0 },
  gameState: GAME_STATE.RUNNING,
  addRef: (row, column, ref) => {},
  setLevel: () => {},
  sendQuiz: () => {},
  onSelectKey: (key) => {},
  updateCurrent: (row, column) => {},
};

export const QuizContext = React.createContext(QuizDefaultValues);

export const QuizPostProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(QuizDefaultValues.quiz);
  const [word, setWord] = useState(QuizDefaultValues.word);
  const [grid, setGrid] = useState(QuizDefaultValues.grid);
  const [level, setLevel] = useState(QuizDefaultValues.level);
  const [current, setCurrent] = useState(QuizDefaultValues.current);
  const [gameState, setGameState] = useState(QuizDefaultValues.gameState);
  const [refs, setRefs] = useState(QuizDefaultValues.refs);

  useEffect(() => {
    if (level === 0) return;

    const words = optionsWordByLevel[level].flatMap((o) => pokemons[o]);
    const random = Math.floor(Math.random() * words.length);
    const word = words[random];
    setWord(word);
    setGrid({ rows: gridSizeByLevel[level], columns: word.length });
  }, [level]);

  useEffect(() => {
    console.log("current", current);
  }, [current]);

  useEffect(() => {
    if (grid.columns === 0 || grid.rows === 0) return;

    const quizDefault = Array(grid.rows)
      .fill("", 0, grid.rows)
      .map((_, rowIndex) =>
        Array(grid.columns)
          .fill("", 0, grid.columns)
          .map((_, columnIndex) => ({
            color: COLORS.INITIAL,
            char: "",
            realChar: "",
            columnIndex,
            rowIndex,
          }))
      );
    setQuiz(quizDefault);
  }, [grid]);

  const updateCurrent = useCallback(
    (row = current.row, column = current.column) => {
      if (level === 0) return;

      if (Object.keys(quiz[row]).every((key) => quiz[row][key].char)) return;

      setCurrent({ row, column });
    },
    [quiz, level, current]
  );

  const updateQuiz = useCallback(
    (row, column, key) => {
      if (level === 0) return;

      const newQuiz = [...quiz];
      newQuiz[row][column].char = replaceSpecialChars(key);
      newQuiz[row][column].realChar = replaceSpecialChars(key);
      setQuiz(newQuiz);
    },
    [quiz, level]
  );

  const onSelectKey = useCallback(
    (key) => {
      if (level === 0) return;

      const { row, column } = current;

      switch (key) {
        case "delete":
        case "Backspace":
          if (!quiz[row][column].char) {
            if (quiz[row][column - 1]?.char) updateQuiz(row, column - 1, "");

            return updateCurrent(row, column > 0 ? column - 1 : 0);
          }
          updateQuiz(row, column, "");
          return updateCurrent(row, column > 0 ? column - 1 : 0);
        default:
          var index = Object.keys(quiz[row]).findIndex(
            (_, i) => i > column && !quiz[row][i].char
          );
          if (index === -1)
            index = Object.keys(quiz[row]).findIndex(
              (_, i) => !quiz[row][i].char
            );
          updateQuiz(row, column, key);
          return updateCurrent(row, index);
      }
    },
    [quiz, level, current, updateCurrent, updateQuiz]
  );

  const sendQuiz = useCallback(() => {
    if (level === 0) return;

    const { row } = current;
    const replacedWord = replaceSpecialChars(word);
    const replacedWordChars = replacedWord.split("");

    var segmentedWord = replacedWordChars.reduce((obj, char, columnIndex) => {
      if (!obj[char]) obj[char] = [];

      obj[char].push(columnIndex);

      return obj;
    }, {});

    var segmenteDigiteddWord = quiz[row].reduce((obj, item) => {
      if (!obj[item.char]) obj[item.char] = [];

      obj[item.char].push(item.columnIndex);

      return obj;
    }, {});

    const items = quiz[row]
      .map((item) => {
        const { char, columnIndex } = item;
        if (segmentedWord[char]?.includes(columnIndex)) {
          segmentedWord[char] = segmentedWord[char].filter(
            (j) => j !== columnIndex
          );
          segmenteDigiteddWord[char] = segmenteDigiteddWord[char].filter(
            (j) => j !== columnIndex
          );

          if (segmentedWord[char].length === 0) {
            delete segmentedWord[char];
            delete segmenteDigiteddWord[char];
          }
          return {
            ...item,
            color: COLORS.IS_CORRECT,
            realChar: word[columnIndex],
          };
        }

        return { char, realChar: char, columnIndex, rowIndex: row };
      })
      .map((item) => {
        if (item.color) return item;

        const { char, columnIndex } = item;

        if (!segmentedWord[char])
          return {
            ...item,
            color: COLORS.DONT_HAVE_CHAR,
          };

        segmentedWord[char].pop();
        segmenteDigiteddWord[char] = segmenteDigiteddWord[char].filter(
          (j) => j !== columnIndex
        );

        if (segmentedWord[char].length === 0) {
          delete segmentedWord[char];
        }

        if (segmenteDigiteddWord[char].length === 0) {
          delete segmenteDigiteddWord[char];
        }

        return {
          ...item,
          color: COLORS.HAS_CHAR,
        };
      });

    setQuiz((oldQuiz) => {
      oldQuiz[row] = items;
      return oldQuiz;
    });

    return updateCurrent(grid.rows - 1 > row ? row + 1 : row, 0);
  }, [quiz, grid, word, level, current, updateCurrent]);

  const addRef = useCallback((row, column, ref) => {
    setRefs((refs) => {
      if (!refs[row]) refs[row] = {};
      refs[row][column] = ref;

      return refs;
    });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        grid,
        refs,
        level,
        current,
        gameState,
        addRef,
        setLevel,
        sendQuiz,
        updateQuiz,
        onSelectKey,
        updateCurrent,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = React.useContext(QuizContext);

  if (typeof context === "undefined") {
    throw new Error(
      "The useQuizContext() hook must be invoked within <QuizContext.Provider />."
    );
  }

  return context;
};
