import React from "react";

const Score = ({ name, isScored, score, onScore }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {score} {!isScored && <button onClick={() => onScore(name)}>Select</button>}
      </td>
    </tr>
  );
};

Score.defaultProps = {
  name: "",
  score: 0,
  isScored: false,
  onScore: () => console.warn("onScore not defined"),
};

export default Score;
