import React from "react";

const Dice = ({ value, index, isSelected, onSelect }) => {
  return (
    <>
      {isSelected ? (
        <button className={"dice is_selected dice_" + value} onClick={() => onSelect(index)}></button>
      ) : (
        <button className={"dice dice_" + value} onClick={() => onSelect(index)}></button>
      )}
    </>
  );
};

Dice.defaultProps = {
  value: 0,
  index: 0,
  isSelected: false,
  onSelect: () => console.warn("onSelect not defined"),
};

export default Dice;
