import React, { useState, useCallback, useEffect } from "react";
import ScoreList from "./scoreList";
import DiceList from "./diceList";

function clearDices() {
  return Array.from({ length: 5 }, (v, index) => ({ index: index, value: 0, isSelected: false }));
}

const Player = () => {
  const [leftTurn, setLeftTurn] = useState(12);
  const [leftRoll, setLeftRoll] = useState(3);
  const [scores, setScores] = useState([
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
  ]);
  const [dices, setDices] = useState(clearDices);

  const rollDices = useCallback(() => {
    setDices(
      dices.map((dice) =>
        dice.isSelected ? dice : { ...dice, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }, [dices]);

  const handleRoll = useCallback(() => {
    if (leftRoll > 0) {
      setLeftRoll(leftRoll - 1);
      rollDices();
    } else if (leftTurn > 0) {
      setLeftTurn(leftTurn - 1);
      setLeftRoll(2);
      rollDices();
    }
  }, [leftTurn, leftRoll, rollDices]);

  const handleScore = useCallback(
    (name) => {
      setScores(
        scores.map((score) => {
          return score.name === name ? { ...score, isScored: true } : score;
        })
      );
      setLeftRoll(3);
      setLeftTurn((leftTurn) => leftTurn - 1);
      setDices(clearDices);
    },
    [scores]
  );

  useEffect(() => {
    if (leftTurn === 1) {
      alert("Game Over!");
    }
  });

  useEffect(() => {
    let result = new Array(12);

    result[0] = dices.reduce((acc, dice) => {
      if (dice.value === 1) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[1] = dices.reduce((acc, dice) => {
      if (dice.value === 2) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[2] = dices.reduce((acc, dice) => {
      if (dice.value === 3) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[3] = dices.reduce((acc, dice) => {
      if (dice.value === 4) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[4] = dices.reduce((acc, dice) => {
      if (dice.value === 5) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[5] = dices.reduce((acc, dice) => {
      if (dice.value === 6) {
        return acc + dice.value;
      }
      return acc;
    }, 0);

    result[6] = dices.reduce((acc, dice) => {
      return acc + dice.value;
    }, 0);

    if (
      Object.entries(
        dices
          .map((dice) => dice.value)
          .reduce((a, v) => {
            a[v] = a[v] ? a[v] + 1 : 1;
            return a;
          }, {})
      ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[1] >= 4
    ) {
      result[7] = dices.reduce((acc, dice) => {
        return acc + dice.value;
      }, 0);
    } else {
      result[7] = 0;
    }

    let arr = Object.values(
      dices
        .map((dice) => dice.value)
        .reduce((a, v) => {
          a[v] = a[v] ? a[v] + 1 : 1;
          return a;
        }, {})
    );
    if ((arr.includes(2) && arr.includes(3)) || arr.includes(5)) {
      result[8] = dices.reduce((acc, dice) => {
        return acc + dice.value;
      }, 0);
    } else {
      result[8] = 0;
    }

    {
      let cnt = 0;
      dices
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
        result[9] = 15;
      } else {
        result[9] = 0;
      }
    }

    {
      let cnt = 0;
      dices
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
        result[10] = 30;
      } else {
        result[10] = 0;
      }
    }

    if (
      dices[0].value !== 0 &&
      Object.entries(
        dices
          .map((dice) => dice.value)
          .reduce((a, v) => {
            a[v] = a[v] ? a[v] + 1 : 1;
            return a;
          }, {})
      ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[1] >= 5
    ) {
      result[11] = 50;
    } else {
      result[11] = 0;
    }

    setScores((scores) =>
      scores.map((score, index) => (score.isScored ? score : { ...score, score: result[index] }))
    );
  }, [dices]);

  const handleSelect = useCallback(
    (index) => {
      setDices(
        dices.map((dice) =>
          dice.index === index ? { ...dice, isSelected: !dice.isSelected } : dice
        )
      );
    },
    [dices]
  );

  return (
    <div>
      Left Turn: {leftTurn} | Left Roll: {leftRoll}
      <hr />
      <ScoreList scores={scores} onScore={handleScore}></ScoreList>
      <hr />
      <DiceList dices={dices} onSelect={handleSelect}></DiceList>
      {leftRoll ? <button onClick={handleRoll}>Roll!</button> : null}
    </div>
  );
};

export default Player;
