import React, { Component } from "react";
import ScoreList from "./scoreList";
import DiceList from "./diceList";

class Player extends Component {
  state = {
    leftTurn: 12,
    leftRoll: 3,
    scores: [
      {
        name: "Aces",
        score: 0,
        isScored: false,
      },
      {
        name: "Deuces",
        score: 0,
        isScored: false,
      },
      {
        name: "Threes",
        score: 0,
        isScored: false,
      },
      {
        name: "Fours",
        score: 0,
        isScored: false,
      },
      {
        name: "Fives",
        score: 0,
        isScored: false,
      },
      {
        name: "Sixes",
        score: 0,
        isScored: false,
      },
      {
        name: "Choices",
        score: 0,
        isScored: false,
      },
      {
        name: "4 of a Kind",
        score: 0,
        isScored: false,
      },
      {
        name: "Full House",
        score: 0,
        isScored: false,
      },
      {
        name: "Small Straight",
        score: 0,
        isScored: false,
      },
      {
        name: "Large Straight",
        score: 0,
        isScored: false,
      },
      {
        name: "Yacht",
        score: 0,
        isScored: false,
      },
    ],
    dices: [
      {
        index: 0,
        value: 0,
        isSelected: false,
      },
      {
        index: 1,
        value: 0,
        isSelected: false,
      },
      {
        index: 2,
        value: 0,
        isSelected: false,
      },
      {
        index: 3,
        value: 0,
        isSelected: false,
      },
      {
        index: 4,
        value: 0,
        isSelected: false,
      },
    ],
  };

  rollDices = () => {
    this.setState({
      dices: this.state.dices.map((dice) =>
        dice.isSelected ? dice : { ...dice, value: Math.floor(Math.random() * 6) + 1 }
      ),
    });
  };

  handleRoll = () => {
    if (this.state.leftRoll > 0) {
      this.setState({
        leftRoll: this.state.leftRoll - 1,
      });
      this.rollDices();
    } else if (this.state.leftTurn > 0) {
      this.setState({
        leftTurn: this.state.leftTurn - 1,
        leftRoll: 2,
      });
      this.rollDices();
    }
  };

  handleScore = (name) => {
    let result = 0;

    switch (name) {
      case "Aces":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 1) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Deuces":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 2) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Threes":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 3) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Fours":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 4) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Fives":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 5) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Sixes":
        result = this.state.dices.reduce((acc, dice) => {
          if (dice.value === 6) {
            return acc + dice.value;
          }
          return acc;
        }, 0);
        break;
      case "Choices":
        result = this.state.dices.reduce((acc, dice) => {
          return acc + dice.value;
        }, 0);
        break;
      case "4 of a Kind":
        if (
          Object.entries(
            this.state.dices
              .map((dice) => dice.value)
              .reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
              }, {})
          ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[1] >= 4
        ) {
          result = this.state.dices.reduce((acc, dice) => {
            return acc + dice.value;
          }, 0);
        } else {
          result = 0;
        }
        break;
      case "Full House":
        let arr = Object.values(
          this.state.dices
            .map((dice) => dice.value)
            .reduce((a, v) => {
              a[v] = a[v] ? a[v] + 1 : 1;
              return a;
            }, {})
        );
        if ((arr.includes(2) && arr.includes(3)) || arr.includes(5)) {
          result = this.state.dices.reduce((acc, dice) => {
            return acc + dice.value;
          }, 0);
        } else {
          result = 0;
        }
        break;
      case "Small Straight":
        {
          let cnt = 0;
          this.state.dices
            .map((dice) => dice.value)
            .sort((a, z) => a - z)
            .reduce((prev, current) => {
              if (current - prev === 1) {
                cnt += 1;
                return current;
              } else {
                if (cnt < 3) {
                  cnt = -1;
                  return -1;
                }
                return current;
              }
            });
          if (cnt >= 3) {
            result = 15;
          } else {
            result = 0;
          }
        }
        break;
      case "Large Straight":
        {
          let cnt = 0;
          this.state.dices
            .map((dice) => dice.value)
            .sort((a, z) => a - z)
            .reduce((prev, current) => {
              if (current - prev === 1) {
                cnt += 1;
                return current;
              } else {
                cnt = -1;
                return -1;
              }
            });
          if (cnt >= 4) {
            result = 30;
          } else {
            result = 0;
          }
        }
        break;
      case "Yacht":
        if (
          Object.entries(
            this.state.dices
              .map((dice) => dice.value)
              .reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
              }, {})
          ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[1] >= 5
        ) {
          result = 50;
        } else {
          result = 0;
        }
        break;
      default:
        console.warn("error!");
    }

    this.setState({
      scores: this.state.scores.map((score) => {
        return score.name === name ? { name, score: result, isScored: true } : score;
      }),
      leftRoll: 3,
      leftTurn: this.state.leftTurn - 1,
      dices: [
        {
          index: 0,
          value: 0,
          isSelected: false,
        },
        {
          index: 1,
          value: 0,
          isSelected: false,
        },
        {
          index: 2,
          value: 0,
          isSelected: false,
        },
        {
          index: 3,
          value: 0,
          isSelected: false,
        },
        {
          index: 4,
          value: 0,
          isSelected: false,
        },
      ],
    });

    if (this.state.leftTurn === 1) {
      alert("Game Over!");
    }
  };

  handleSelect = (index) => {
    const { dices } = this.state;
    console.log(dices[index]);
    this.setState({
      dices: dices.map((dice) =>
        dice.index === index ? { ...dice, isSelected: !dice.isSelected } : dice
      ),
    });
  };

  render() {
    const { leftTurn, leftRoll } = this.state;

    return (
      <div>
        Left Turn: {leftTurn} | Left Roll: {leftRoll}
        <hr />
        <ScoreList scores={this.state.scores} onScore={this.handleScore}></ScoreList>
        <hr />
        <DiceList dices={this.state.dices} onSelect={this.handleSelect}></DiceList>
        {leftRoll ? <button onClick={this.handleRoll}>Roll!</button> : null}
      </div>
    );
  }
}

export default Player;
