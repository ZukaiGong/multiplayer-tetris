import type { Matrix } from "@/types";
import { getNextType } from "@/utils";

export enum ActionType {
  MATRIX = "MATRIX",
  SPEED_RUN = "SPEED_RUN", // 掉落的速度
  NEXT_BLOCK = "NEXT_BLOCK", // 下一个方块的类型
}

export type Action =
  | { type: ActionType.MATRIX; data: Matrix }
  | { type: ActionType.SPEED_RUN; data: number }
  | { type: ActionType.NEXT_BLOCK; data: ReturnType<typeof getNextType> };

export const actions = {
  matrix,
  speedRun,
  nextBlock,
};

function matrix(data: Matrix): Action {
  return {
    type: ActionType.MATRIX,
    data,
  };
}

function speedRun(data: number): Action {
  return {
    type: ActionType.SPEED_RUN,
    data,
  };
}

function nextBlock(next = getNextType()): Action {
  return {
    type: ActionType.NEXT_BLOCK,
    data: next,
  };
}
