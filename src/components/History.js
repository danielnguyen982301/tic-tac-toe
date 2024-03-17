import React from "react";

function History({ history, undo }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <button onClick={() => undo(item.id)}>Go to {item.order}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
