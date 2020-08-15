import React from "react";

const Dice = ({ value, index, isSelected, onSelect }) => {
  return (
    <div>
      {value}
      {value === 0 ? null : (
        <button onClick={() => onSelect(index)}>{isSelected ? "Unselect" : "Select"}</button>
      )}
    </div>
  );
};

Dice.defaultProps = {
  value: 0,
  index: 0,
  isSelected: false,
  onSelect: () => console.warn("onSelect not defined"),
};

export default Dice;
