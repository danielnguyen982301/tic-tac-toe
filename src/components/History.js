import React from "react";

function History({ history, undo }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {history.map((item) => (
          <li>
            <button onClick={() => undo(item.move)}>Go to {item.order}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
