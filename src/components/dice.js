import React from "react";

const Dice = ({ value, index, isSelected, onSelect }) => {
  return (
    <>
      {isSelected ? (
        <button className="dice is_selected" onClick={() => onSelect(index)}>{value}</button>
      ) : (
        <button className="dice" onClick={() => onSelect(index)}>{value}</button>
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
