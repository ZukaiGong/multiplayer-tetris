import { createContext, useReducer, useContext, default as React } from "react";

import { ActionType } from "./actions";

import type { Matrix } from "@/types";
import type { Action } from "./actions";

interface StoreContex {
  matrix: Matrix;
}

const StoreContext = createContext<StoreContex | null>(null);
const StoreDispatchContext = createContext<React.Dispatch<Action> | null>(null);

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
    default:
      throw new Error("unknown action: " + action.type);
  }
}

const initialStore: StoreContex = {
  matrix: [],
};
