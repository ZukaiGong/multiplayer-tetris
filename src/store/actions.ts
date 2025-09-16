import type { Matrix } from "@/types";
import { getNextType } from "@/utils";
import Block from "@/utils/block";

export enum ActionType {
  MATRIX = "MATRIX",
  SPEED_RUN = "SPEED_RUN", // 掉落的速度
  MOVE_BLOCK = "MOVE_BLOCK", // 当前掉落的方块
  NEXT_BLOCK = "NEXT_BLOCK", // 下一个方块的类型
  LOCK = "LOCK", // 用于临时禁止玩家操作，避免在动画、消行、生成新方块等关键时刻出现状态错乱或多次触发操作。
}

export type Action =
  | { type: ActionType.MATRIX; data: Matrix }
  | { type: ActionType.SPEED_RUN; data: number }
  | { type: ActionType.NEXT_BLOCK; data: ReturnType<typeof getNextType> }
  | { type: ActionType.MOVE_BLOCK; data: Block | null }
  | { type: ActionType.LOCK; data: boolean };

export const actions = {
  matrix,
  speedRun,
  nextBlock,
  moveBlock,
  lock,
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

function moveBlock(option: {
  blockParam: ConstructorParameters<typeof Block>[0];
  reset?: boolean;
}): Action {
  return {
    type: ActionType.MOVE_BLOCK,
    data: option.reset ? null : new Block(option.blockParam),
  };
}

function nextBlock(next = getNextType()): Action {
  return {
    type: ActionType.NEXT_BLOCK,
    data: next,
  };
}

function lock(data: boolean): Action {
  return {
    type: ActionType.LOCK,
    data,
  };
}
