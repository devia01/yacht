import React from "react";
import Score from "./score";

const ScoreList = ({ scores, onScore, subtotal, bonus }) => {
  const list = scores.map((score) => (
    <Score
      name={score.name}
      key={score.name}
      isScored={score.isScored}
      score={score.score}
      onScore={onScore}
    ></Score>
  ));

  return (
    <>
      <table>
        <tbody>
          {list.slice(0, 6)}
        </tbody>
      </table>

      <table className="total">
        <tbody>
          <tr>
            <td className="td_name">
              <span>Subtotal</span>{bonus !== 0 ? <span className="bonus"> + 35</span> : null}
            </td>
            <td className="td_score">
              <span>{bonus !== 0 ? subtotal + bonus : subtotal + " / 63"}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>{list.slice(6)}</tbody>
      </table>
    </>
  );
};

export default ScoreList;
