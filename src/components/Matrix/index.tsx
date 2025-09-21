import { useStore } from "@/store/index";
import classnames from "classnames";

import style from "./index.module.css";

export default function Matrix() {
  const store = useStore();

  /**
   * 在游戏进行中，画面是由store.matrix与当前方块计算得出，
   * store.matrix在方块固定之后才会更新
   * @returns
   */
  function getResult() {
    const moveBlock = store.moveBlock;
    const shape = moveBlock?.shape;

    const matrix = store.matrix.map((row) => [...row]);
    if (shape) {
      // 纵坐标是X，横坐标是Y，xy是当前图形的左上角小方块的坐标
      const xy = moveBlock.xy;
      shape.forEach((row, rowIdx) => {
        row.forEach((dot, colIdx) => {
          // xy[0] + rowIdx: 当前小方块的纵坐标，>=0是指小方块在矩阵内
          if (dot && xy[0] + rowIdx >= 0) {
            matrix[xy[0] + rowIdx][xy[1] + colIdx] = 1;
          }
        });
      });
    }

    return matrix;
  }

  const matrix = getResult();
  return (
    <div className={style.matrix}>
      {matrix.map((line, lIdx) => (
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
