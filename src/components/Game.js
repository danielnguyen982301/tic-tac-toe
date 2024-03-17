import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(
    Array.from(Array(10), (x) => Array(10).fill(null))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([
    {
      id: "move#0",
      move: 0,
      board: Array.from(Array(10), (x) => Array(10).fill(null)),
      xIsNext: true,
      order: "game start",
    },
  ]);

  //Declaring a Winner
  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);

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
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j + 1] &&
            squares[i][j] === squares[i + 2][j + 2] &&
            squares[i][j] === squares[i + 3][j + 3] &&
            squares[i][j] === squares[i + 4][j + 4]
          ) {
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
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
            return squares[i][j];
          }
          if (
            squares[i][j] &&
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
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
            return squares[i][j];
          }
        }
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i, j) => {
    const newSquares = squares.slice();
    if (newSquares[i][j] || winner) return;
    newSquares[i][j] = xIsNext ? "X" : "O";
    setXIsNext((turn) => !turn);
    setSquares(newSquares);
    const newMove = {
      id: Date.now(),
      move: currentMove + 1,
      board: JSON.stringify(newSquares),
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
        board: Array.from(Array(10), (x) => Array(10).fill(null)),
        xIsNext: true,
        order: "game start",
      },
    ]);
  };

  const undo = (id) => {
    history.forEach((item) => {
      if (id === item.id) {
        setSquares(item.move ? JSON.parse(item.board) : item.board);
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
        <div className="history">
          <h4>History</h4>
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                <button onClick={() => undo(item.id)}>
                  Go to {item.order}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
