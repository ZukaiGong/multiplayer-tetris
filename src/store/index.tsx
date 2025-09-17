import { createContext, useReducer, useContext, default as React } from "react";

import { ActionType } from "./actions";
import { getNextType } from "@/utils";
import Block from "@/utils/block";

import type { Matrix } from "@/types";
import type { Action } from "./actions";

interface StoreContext {
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
}

function storeReducer(store: StoreContext, action: Action) {
  switch (action.type) {
    case ActionType.MATRIX:
      return {
        ...store,
        matrix: action.data,
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
    default:
      throw new Error("unknown action");
  }
}

const initialStore: StoreContext = {
  matrix: [],
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
};

const StoreContext = createContext<StoreContext>(initialStore);
const StoreDispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <>
      <StoreContext value={store}>
        <StoreDispatchContext value={dispatch}>{children}</StoreDispatchContext>
      </StoreContext>
    </>
  );
};

export function useStore() {
  return useContext(StoreContext);
}

export function useStoreDispatch() {
  return useContext(StoreDispatchContext);
}
