import { actions } from "@/store/actions";
import {
  blankLine,
  blankMatrix,
  clearPoints,
  eachLines,
} from "@/utils/constant";
import { want, isClear, isOver } from "@/utils";

import type { Matrix } from "@/types";
import type { StoreContext } from "@/store/storeReducer";
import type { Action } from "@/store/actions";

function getStartMatrix(startLines: number): Matrix {
  // TODO: 游戏开始时，随机生成startLines行填充
  const startMatrix = [];
  for (let i = 0, len = 20 - startLines; i < len; i++) {
    startMatrix.unshift([...blankLine]);
  }
  return startMatrix;
}

/**
 * 游戏开始
 */
function createStart(
  store: StoreContext,
  storeDispatch: React.Dispatch<Action>
) {
  return function start() {
    storeDispatch(actions.speedRun(store.speedStart));
    const startMatrix = getStartMatrix(0);
    storeDispatch(actions.matrix(startMatrix));
    storeDispatch(actions.moveBlock({ blockParam: { type: store.nextBlock } }));
    storeDispatch(actions.nextBlock());
    // auto();
  };
}

/**
 * 写入分数，同时判断是否创造了最高记录
 * @param point
 */
function createUpdatePoint(
  store: StoreContext,
  storeDispatch: React.Dispatch<Action>
) {
  return function updatePoint(point: number) {
    storeDispatch(actions.point(point));
    if (point > 0 && point > store.max) {
      storeDispatch(actions.max(point));
    }
  };
}

/**
 * 自动下落
 * @param timeout
 */
function createAutoFall(
  store: StoreContext,
  storeDispatch: React.Dispatch<Action>,
  nextAround: (matrix: Matrix, stopDownTrigger?: () => void) => void
) {
  return function autoFall(timeout?: number) {
    if (!store.moveBlock) return;
    const next = store.moveBlock.fall();
    if (want(next, store.matrix)) {
      storeDispatch(actions.moveBlock({ blockParam: next }));
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
      nextAround(newMatrix);
    }
  };
}

/**
 * 前一个方块已经固定到界面中，生成下一个方块
 * @param matrix
 * @param stopDownTrigger
 * @returns
 */
function createNextAround(
  store: StoreContext,
  storeDispatch: React.Dispatch<Action>,
  clearFallInterval: () => void,
  updatePoint: (point: number) => void,
  overStart: () => void
) {
  return function nextAround(matrix: Matrix, stopDownTrigger?: () => void) {
    clearFallInterval();
    storeDispatch(actions.lock(true));
    storeDispatch(actions.matrix(matrix));
    if (typeof stopDownTrigger === "function") {
      stopDownTrigger();
    }

    // 得分
    const addPoint = store.point + 10 + (store.speedRun - 1) * 2;
    updatePoint(addPoint);

    // 如果能消除行，播放消行音效，停止生成下一个方块
    if (isClear(matrix)) {
      // if (music.clear) {
      //   music.clear();
      // }
      return;
    }

    // 如果结束，播放结束音效，停止生成下一个方块
    if (isOver(matrix)) {
      // if (music.gameover) {
      //   music.gameover();
      // }
      overStart();
      return;
    }

    setTimeout(() => {
      storeDispatch(actions.lock(false));
      storeDispatch(
        actions.moveBlock({ blockParam: { type: store.nextBlock } })
      );
      storeDispatch(actions.nextBlock());
      // auto();
    }, 100);
  };
}

/**
 * 执行消除行操作
 * @param matrix
 * @param lines
 */
function createClearLines(
  store: StoreContext,
  storeDispatch: React.Dispatch<Action>,
  updatePoint: (point: number) => void
) {
  return function clearLines(matrix: Matrix, lines: number[]) {
    const newMatrix = matrix.map((row) => [...row]);
    // 删除要消除的行，并添加空白行
    lines.forEach((n) => {
      newMatrix.splice(n, 1);
      newMatrix.unshift([...blankLine]);
    });

    storeDispatch(actions.matrix(newMatrix));
    // 因为有要消除的行时，nextAround被中断，所以在消除完之后要再继续生成新的方块
    storeDispatch(actions.moveBlock({ blockParam: { type: store.nextBlock } }));
    storeDispatch(actions.nextBlock());
    // auto();

    // 累计消除的行数
    storeDispatch(actions.lock(false));
    const clearLinesCount = store.clearLines + lines.length;
    storeDispatch(actions.clearLines(clearLinesCount));

    // 得分
    const addPoint = store.point + clearPoints[lines.length - 1]; // 一次消除的行越多, 加分越多
    updatePoint(addPoint);

    // 消除行数, 增加对应速度
    const speedAdd = Math.floor(clearLinesCount / eachLines);
    const speedNow = store.speedStart + speedAdd;
    storeDispatch(actions.speedRun(speedNow > 6 ? 6 : speedNow));
  };
}

function createPause(
  storeDispatch: React.Dispatch<Action>,
  clearFallInterval: () => void
) {
  return function pause(isPause: boolean) {
    storeDispatch(actions.pause(isPause));
    if (isPause) {
      clearFallInterval();
      return;
    }
    // auto();
  };
}

/**
 * 游戏结束，触发动画
 */
function createOverStart(
  storeDispatch: React.Dispatch<Action>,
  clearFallInterval: () => void
) {
  return function overStart() {
    clearFallInterval();
    storeDispatch(actions.lock(true));
    storeDispatch(actions.reset(true));
    storeDispatch(actions.pause(false));
  };
}

/**
 * 游戏结束动画完成
 */
function createOverEnd(storeDispatch: React.Dispatch<Action>) {
  return function overEnd() {
    storeDispatch(actions.matrix(blankMatrix));
    storeDispatch(actions.moveBlock({ reset: true }));
    storeDispatch(actions.reset(false));
    storeDispatch(actions.lock(false));
    storeDispatch(actions.clearLines(0));
  };
}

export {
  createStart,
  createUpdatePoint,
  createAutoFall,
  createNextAround,
  createClearLines,
  createPause,
  createOverStart,
  createOverEnd,
};
