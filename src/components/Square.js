import React from "react";

function Square({ square, handleClick, i }) {
  return (
    <button className={"square"} onClick={handleClick}>
      {square}
    </button>
  );
}

export default Square;
