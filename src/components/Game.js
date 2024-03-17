import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([
    {
      move: 0,
      squares: Array(9).fill(null),
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
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (newSquares[i] || winner) return;
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext((turn) => !turn);
    const newMove = {
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
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setCurrentMove(0);
    setHistory([
      {
        move: 0,
        squares: Array(9).fill(null),
        xIsNext: true,
        order: "game start",
      },
    ]);
  };

  const undo = (move) => {
    history.forEach((item) => {
      if (move === item.move) {
        setSquares(item.squares);
        setXIsNext(item.xIsNext);
        setCurrentMove(item.move);
      }
    });
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
      </div>
      <div className="history">
        <h4>History</h4>
        <ul>
          {history.map((item) => (
            <li>
              <button onClick={() => undo(item.move)}>
                Go to {item.order}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
