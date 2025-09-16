import { createContext, useReducer, useContext, default as React } from "react";

import { ActionType } from "./actions";
import { getNextType } from "@/utils";
import Block from "@/utils/block";

import type { Matrix } from "@/types";
import type { Action } from "./actions";

interface StoreContext {
  matrix: Matrix;
  speedRun: number;
  moveBlock: Block | null;
  nextBlock: ReturnType<typeof getNextType>;
  lock: boolean;
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
    default:
      throw new Error("unknown action");
  }
}

const initialStore: StoreContext = {
  matrix: [],
  speedRun: 1,
  moveBlock: null,
  nextBlock: getNextType(),
  lock: false,
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
