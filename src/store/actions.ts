import type { Matrix } from "@/types";

export enum ActionType {
  MATRIX = "MATRIX",
  SPEED_RUN = "SPEED_RUN",
}

export type Action =
  | { type: ActionType.MATRIX; data: Matrix }
  | { type: ActionType.SPEED_RUN; data: number };

export const actions = {
  matrix,
  speedRun,
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
