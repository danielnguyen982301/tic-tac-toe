import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [squares, setSquares] = useState(
    Array.from(Array(10), (x) => Array(10).fill(null))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [currentMove, setCurrentMove] = useState(0);
  const [winLine, setWinLine] = useState(null);
  const [history, setHistory] = useState([
    {
      id: "move#0",
      move: 0,
      squares: Array.from(Array(10), (x) => Array(10).fill(null)),
      xIsNext: true,
      order: "game start",
    },
  ]);

  //Declaring a Winner
  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);

  //Paint the winning line and remove the paint
  useEffect(() => {
    const paintWinLine = () => {
      if (!winLine) return;
      winLine.forEach((square) => {
        document
          .getElementById(`row-${square.row} col-${square.col}`)
          .classList.add("win-square");
      });
    };

    const resetPaint = () => {
      if (!winLine) return;
      winLine.forEach((square) => {
        document
          .getElementById(`row-${square.row} col-${square.col}`)
          .classList.remove("win-square");
      });
      setWinLine(null);
    };

    winner ? paintWinLine() : resetPaint();
  }, [winLine, winner]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.

  const calculateWinner = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares.length; j++) {
        if (
          i >= 0 &&
          i <= squares.length - 5 &&
          j >= 0 &&
          j <= squares.length - 5
        ) {
          if (
            squares[i][j] &&
            squares[i][j] === squares[i][j + 1] &&
            squares[i][j] === squares[i][j + 2] &&
            squares[i][j] === squares[i][j + 3] &&
            squares[i][j] === squares[i][j + 4]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i, col: j + 1 },
              { row: i, col: j + 2 },
              { row: i, col: j + 3 },
              { row: i, col: j + 4 },
            ]);
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j + 1] &&
            squares[i][j] === squares[i + 2][j + 2] &&
            squares[i][j] === squares[i + 3][j + 3] &&
            squares[i][j] === squares[i + 4][j + 4]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i + 1, col: j + 1 },
              { row: i + 2, col: j + 2 },
              { row: i + 3, col: j + 3 },
              { row: i + 4, col: j + 4 },
            ]);
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i + 1, col: j },
              { row: i + 2, col: j },
              { row: i + 3, col: j },
              { row: i + 4, col: j },
            ]);
            return squares[i][j];
          }
        }

        if (i >= 0 && i <= squares.length - 5 && j >= 4) {
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j - 1] &&
            squares[i][j] === squares[i + 2][j - 2] &&
            squares[i][j] === squares[i + 3][j - 3] &&
            squares[i][j] === squares[i + 4][j - 4]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i + 1, col: j - 1 },
              { row: i + 2, col: j - 2 },
              { row: i + 3, col: j - 3 },
              { row: i + 4, col: j - 4 },
            ]);
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i + 1, col: j },
              { row: i + 2, col: j },
              { row: i + 3, col: j },
              { row: i + 4, col: j },
            ]);
            return squares[i][j];
          }
        }

        if (i > 4 && j >= 0 && j <= squares.length - 5) {
          if (
            squares[i][j] &&
            squares[i][j] === squares[i][j + 1] &&
            squares[i][j] === squares[i][j + 2] &&
            squares[i][j] === squares[i][j + 3] &&
            squares[i][j] === squares[i][j + 4]
          ) {
            setWinLine([
              { row: i, col: j },
              { row: i, col: j + 1 },
              { row: i, col: j + 2 },
              { row: i, col: j + 3 },
              { row: i, col: j + 4 },
            ]);
            return squares[i][j];
          }
        }
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i, j) => {
    if (winner || squares[i][j]) return;
    const newSquares = squares.map((row, rowNum) =>
      row.map((col, colNum) => {
        return i === rowNum && j === colNum ? (xIsNext ? "X" : "O") : col;
      })
    );

    setXIsNext((turn) => !turn);
    setSquares(newSquares);
    const newMove = {
      id: Date.now(),
      move: currentMove + 1,
      squares: newSquares,
      xIsNext: !xIsNext,
      order: `move #${currentMove + 1}`,
    };
    setCurrentMove(currentMove + 1);
    setHistory([...history.slice(0, currentMove + 1), newMove]);
  };

  //Restart game
  const handlRestart = () => {
    setSquares(Array.from(Array(10), (x) => Array(10).fill(null)));
    setXIsNext(true);
    setCurrentMove(0);
    setHistory([
      {
        move: 0,
        squares: Array.from(Array(10), (x) => Array(10).fill(null)),
        xIsNext: true,
        order: "game start",
      },
    ]);
  };

  //Switch to previous moves
  const undo = (id) => {
    history.forEach((item) => {
      if (id === item.id) {
        setSquares(item.squares);
        setXIsNext(item.xIsNext);
        setCurrentMove(item.move);
      }
    });
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
      <div className="game">
        <Board squares={squares} handleClick={handleClick} />
        <History history={history} undo={undo} />
      </div>

      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
