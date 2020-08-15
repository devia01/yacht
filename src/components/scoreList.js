import React, { Component } from "react";
import Score from "./score";

class ScoreList extends Component {
  static defaultProps = {};

  render() {
    const { scores, onScore } = this.props;
    const list = scores.map((score) => (
      <Score
        name={score.name}
        isScored={score.isScored}
        score={score.score}
        onScore={onScore}
      ></Score>
    ));

    return <div>{list}</div>;
  }
}

export default ScoreList;
