import React from "react";
import Dice from "./dice";

const DiceList = ({ dices, onSelect }) => {
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
};

export default DiceList;
