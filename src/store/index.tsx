import { createContext, useReducer, useContext, default as React } from "react";

import { ActionType } from "./actions";

import type { Matrix } from "@/types";
import type { Action } from "./actions";

interface StoreContex {
  matrix: Matrix;
  speedRun: number;
}

const StoreContext = createContext<StoreContex | null>(null);
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

function storeReducer(store: StoreContex, action: Action) {
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
    default:
      throw new Error("unknown action");
  }
}

const initialStore: StoreContex = {
  matrix: [],
  speedRun: 1,
};
