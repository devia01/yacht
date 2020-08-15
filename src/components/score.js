import React from "react";

const Score = ({ name, isScored, score, onScore }) => {
  return (
    <div>
      {name} | {score} {!isScored && <button onClick={() => onScore(name)}>Select</button>}
    </div>
  );
};

Score.defaultProps = {
  name: "",
  score: 0,
  isScored: false,
  onScore: () => console.warn("onScore not defined"),
};

export default Score;
