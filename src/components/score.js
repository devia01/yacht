import React from "react";

const Score = ({ name, isScored, score, onScore }) => {
  return (
    <tr>
      <td className="td_name">{name}</td>
      <td className="td_score">
        {isScored ? <span className="score is_scored">{score}</span> : <button className="score" onClick={() => onScore(name)}>{score}</button>}
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
