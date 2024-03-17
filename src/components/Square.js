import React from "react";

function Square({ square, handleClick, btnId }) {
  return (
    <button id={btnId} className={`square`} onClick={handleClick}>
      {square}
    </button>
  );
}

export default Square;
