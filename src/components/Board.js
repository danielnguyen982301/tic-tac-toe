import Square from "./Square";

export default function Board({ squares, handleClick }) {
  return (
    <div className="board">
      <div>
        {squares.map((row, i) => (
          <div>
            {row.map((col, j) => (
              <Square square={col} handleClick={() => handleClick(i, j)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
