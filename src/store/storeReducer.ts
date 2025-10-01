import { ActionType } from "./actions";
import { KeyboardActionType } from "./keyboardActions";
import { getNextType } from "@/utils";
import Block from "@/utils/block";
import { blankMatrix } from "@/utils/constant";

import type { Action } from "./actions";
import type { Matrix } from "@/types";

export interface StoreContext {
  matrix: Matrix;
  speedStart: number;
  speedRun: number;
  moveBlock: Block | null;
  nextBlock: ReturnType<typeof getNextType>;
  lock: boolean;
  point: number;
  max: number;
  pause: boolean;
  reset: boolean;
  clearLines: number;
  keyboard: {
    left: boolean;
    right: boolean;
  };
}

function storeReducer(store: StoreContext, action: Action) {
  switch (action.type) {
    case ActionType.MATRIX:
      return {
        ...store,
        matrix: action.data,
      };
    case ActionType.SPEED_START:
      return {
        ...store,
        speedStart: action.data,
      };
    case ActionType.SPEED_RUN:
      return {
        ...store,
        speedRun: action.data,
      };
    case ActionType.MOVE_BLOCK:
      return {
        ...store,
        moveBlock: action.data,
      };
    case ActionType.NEXT_BLOCK:
      return {
        ...store,
        nextBlock: action.data,
      };
    case ActionType.LOCK:
      return {
        ...store,
        lock: action.data,
      };
    case ActionType.POINT:
      return {
        ...store,
        point: action.data,
      };
    case ActionType.MAX:
      return {
        ...store,
        max: action.data,
      };
    case ActionType.PAUSE:
      return {
        ...store,
        pause: action.data,
      };
    case ActionType.RESET:
      return {
        ...store,
        reset: action.data,
      };
    case ActionType.CLEAR_LINES:
      return {
        ...store,
        clearLines: action.data,
      };
    case KeyboardActionType.KEY_LEFT:
      return {
        ...store,
        keyboard: {
          ...store.keyboard,
          left: action.data,
        },
      };
    case KeyboardActionType.KEY_RIGHT:
      return {
        ...store,
        keyboard: {
          ...store.keyboard,
          right: action.data,
        },
      };
    default:
      if (import.meta.env.MODE !== "production") {
        throw new Error("unknown action");
      }
      return store;
  }
}

const initialStore: StoreContext = {
  matrix: blankMatrix,
  speedStart: 1,
  speedRun: 1,
  moveBlock: null,
  nextBlock: getNextType(),
  lock: false,
  point: 0,
  max: 0,
  pause: false,
  reset: false,
  clearLines: 0,
  keyboard: {
    left: false,
    right: false,
  },
};

export { initialStore, storeReducer };
