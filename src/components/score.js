import React, { Component } from "react";

class Score extends Component {
  static defaultProps = {
    name: "",
    score: 0,
    isScored: false,
    onScore: () => console.warn("onScore not defined"),
  };

  render() {
    const { name, isScored, score, onScore } = this.props;
    return (
      <div>
        {name} | {score} {!isScored && <button onClick={() => onScore(name)}>Select</button>}
      </div>
    );
  }
}

export default Score;
