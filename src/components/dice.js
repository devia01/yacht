import React, { Component } from "react";

class Dice extends Component {
  static defaultProps = {
    value: 0,
    index: 0,
    isSelected: false,
    onSelect: () => console.warn("onSelect not defined"),
  };

  render() {
    const { value, index, isSelected, onSelect } = this.props;
    return (
      <div>
        {value}
        {value === 0 ? null : (
          <button onClick={() => onSelect(index)}>{isSelected ? "Unselect" : "Select"}</button>
        )}
      </div>
    );
  }
}

export default Dice;
