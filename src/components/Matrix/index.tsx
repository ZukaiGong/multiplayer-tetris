import classnames from "classnames";

import { blankMatrix } from "@/utils/constant";
import style from "./index.module.css";

export default function Matrix() {
  return (
    <div className={style.matrix}>
      {blankMatrix.map((line, lIdx) => (
        <div key={lIdx} className="line">
          {line.map((cell, cIdx) => (
            <div
              key={cIdx}
              className={classnames([
                style.block,
                { c: cell === 1, d: cell === 2 },
              ])}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
