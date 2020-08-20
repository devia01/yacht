import React from "react";
import Score from "./score";

const ScoreList = ({ scores, onScore }) => {
  const list = scores.map((score) => (
    <Score
      name={score.name}
      isScored={score.isScored}
      score={score.score}
      onScore={onScore}
    ></Score>
  ));

  return <table>{list}</table>;
};

export default ScoreList;
