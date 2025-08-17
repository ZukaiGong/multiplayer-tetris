import type { Matrix } from "@/types";

export enum ActionType {
  MATRIX = "MATRIX",
}

export type Action = { type: ActionType.MATRIX; data: Matrix };

export const actions = {
  matrix,
};

function matrix(data: Matrix) {
  return {
    type: ActionType.MATRIX,
    data,
  };
}
