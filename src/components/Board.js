import Square from "./Square";

export default function Board({ squares, handleClick }) {
  return (
    <div className="board">
      <div>
        {squares.map((row, i) => (
          <div key={`row-${i}`}>
            {row.map((col, j) => (
              <Square
                key={`row-${i} col-${j}`}
                btnId={`row-${i} col-${j}`}
                square={col}
                handleClick={() => handleClick(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
