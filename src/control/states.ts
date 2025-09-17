import { useStore, useStoreDispatch } from "@/store/index";
import { actions } from "@/store/actions";
import { blankLine, speeds } from "@/utils/constant";
import { want, isClear, isOver } from "@/utils";

import type { Matrix } from "@/types";

function getStartMatrix(startLines: number): Matrix {
  // TODO: 游戏开始时，随机生成startLines行填充
  const startMatrix = [];
  for (let i = 0, len = 20 - startLines; i < len; i++) {
    startMatrix.unshift([...blankLine]);
  }
  return startMatrix;
}

// 自动下落setTimeout变量
let fallInterval: ReturnType<typeof setTimeout>;

export default function useStates() {
  const store = useStore();
  const storeDispatch = useStoreDispatch();

  return {
    // 游戏开始
    start() {
      // storeDispatch(actions.speedRun(store.speedStart));
      const startMatrix = getStartMatrix(0);
      storeDispatch(actions.matrix(startMatrix));
      storeDispatch(
        actions.moveBlock({ blockParam: { type: store.nextBlock } })
      );
      storeDispatch(actions.nextBlock());
      this.auto();
    },

    // 自动下落
    auto(timeout?: number) {
      const out = typeof timeout === "number" && timeout < 0 ? 0 : timeout;
      const fall = () => {
        const next = store.moveBlock!.fall();
        if (want(next, store.matrix)) {
          storeDispatch(actions.moveBlock({ blockParam: next }));
          fallInterval = setTimeout(fall, speeds[store.speedRun - 1]);
        } else {
          // 如果方块已经无法移动了，就将其固定在matrix上
          const newMatrix = store.matrix.map((row) => [...row]);
          const { shape, xy } = store.moveBlock!;
          shape.forEach((m, i) =>
            m.forEach((n, j) => {
              if (n && xy[0] + i >= 0) {
                // 纵坐标有可能为负，所以需确定当前小方块在显示范围内
                newMatrix[xy[0] + i][xy[1] + j] = 1;
              }
            })
          );
          this.nextAround(newMatrix);
        }
      };

      clearTimeout(fallInterval);
      fallInterval = setTimeout(
        fall,
        out === undefined ? speeds[store.speedRun - 1] : out
      );
    },

    // 前一个方块已经固定到界面中，生成下一个方块
    nextAround(matrix: Matrix, stopDownTrigger?: Function) {
      clearTimeout(fallInterval);
      storeDispatch(actions.lock(true));
      storeDispatch(actions.matrix(matrix));
      if (typeof stopDownTrigger === "function") {
        stopDownTrigger();
      }

      // 得分
      const addPoint = store.point + 10 + (store.speedRun - 1) * 2;
      this.dispatchPoint(addPoint);

      // 如果能消除行，播放消行音效
      // if (isClear(matrix)) {
      //   if (music.clear) {
      //     music.clear();
      //   }
      //   return;
      // }

      // 如果结束，播放结束音效
      // if (isOver(matrix)) {
      //   if (music.gameover) {
      //     music.gameover();
      //   }
      //   states.overStart();
      //   return;
      // }

      setTimeout(() => {
        storeDispatch(actions.lock(false));
        storeDispatch(
          actions.moveBlock({ blockParam: { type: store.nextBlock } })
        );
        storeDispatch(actions.nextBlock());
      }, 100);
    },

    // 写入分数，同时判断是否创造了最高记录
    dispatchPoint(point: number) {
      storeDispatch(actions.point(point));
      if (point > 0 && point > store.max) {
        storeDispatch(actions.max(point));
      }
    },

    pause(isPause: boolean) {
      storeDispatch(actions.pause(isPause));
      if (isPause) {
        clearTimeout(fallInterval);
        return;
      }
      this.auto();
    },
  };
}
