import React, { useState, useCallback, useEffect } from "react";
import ScoreList from "./scoreList";
import DiceList from "./diceList";

function clearDices() {
  return Array.from({ length: 5 }, (_, index) => ({ index: index, value: 0, isSelected: false }));
}

function sumDices(dices, value = 0) {
  if (value !== 0) {
    return dices.reduce((acc, dice) => {
      if (dice.value === value) {
        return acc + dice.value;
      }
      return acc;
    }, 0);
  } else {
    return dices.reduce((acc, dice) => {
      return acc + dice.value;
    }, 0);
  }
}

function countDices(dices) {
  return Object.values(
    dices
      .map((dice) => dice.value)
      .reduce((a, v) => {
        a[v] = a[v] ? a[v] + 1 : 1;
        return a;
      }, {})
  );
}

function countStraightDices(dices) {
  let dicesValue = dices.map((dice) => dice.value).sort((a, z) => a - z);
  let count = 1;
  for (let i = 0; i < 5; i++) {
    if (dicesValue[i + 1] - dicesValue[i] === 1) {
      count += 1;
    } else if (dicesValue[i + 1] - dicesValue[i] !== 0) {
      if (count >= 4) {
        return count;
      }
      count = -1;
    }
  }
  return count;
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
    let result = new Array(12).fill(0);
    const count = countDices(dices);
    const countStraight = countStraightDices(dices);
    const sum = sumDices(dices);

    // Aces ~ Sixes
    for (let i = 0; i < 6; i++) {
      result[i] = sumDices(dices, i + 1);
    }

    // Choices
    result[6] = sum;

    // 4 of a Kind
    if (Math.max(...count) >= 4) {
      result[7] = sum;
    }

    // Full House
    if ((count.includes(2) && count.includes(3)) || count.includes(5)) {
      result[8] = sum;
    }

    // Small Straight
    if (countStraight >= 4) {
      result[9] = 15;
    }

    // Large Straight
    if (countStraight >= 5) {
      result[10] = 30;
    }

    // Yacht
    if (dices[0].value !== 0 && count.includes(5)) {
      result[11] = 50;
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
