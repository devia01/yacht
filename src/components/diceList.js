import React, { Component } from "react";
import Dice from "./dice";

class DiceList extends Component {
  render() {
    const { dices, onSelect } = this.props;
    const list = dices.map((dice) => (
      <Dice
        value={dice.value}
        index={dice.index}
        isSelected={dice.isSelected}
        key={dice.index}
        onSelect={onSelect}
      ></Dice>
    ));

    return <div>{list}</div>;
  }
}

export default DiceList;
