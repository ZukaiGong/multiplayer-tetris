import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
  default as React,
} from "react";

import useFallInterval from "@/control/useFallInterval";
import { initialStore, storeReducer } from "./storeReducer";
import {
  createStart,
  createUpdatePoint,
  createAutoFall,
  createNextAround,
  createClearLines,
  createPause,
  createOverStart,
  createOverEnd,
} from "@/control/states";
import { speeds } from "@/utils/constant";

import type { StoreContext } from "./storeReducer";

const StoreContext = createContext<StoreContext>(initialStore);
const StoreDispatchContext = createContext<{
  start: ReturnType<typeof createStart>;
  autoFall: ReturnType<typeof createAutoFall>;
  nextAround: ReturnType<typeof createNextAround>;
  updatePoint: ReturnType<typeof createUpdatePoint>;
  clearLines: ReturnType<typeof createClearLines>;
  pause: ReturnType<typeof createPause>;
  overStart: ReturnType<typeof createOverStart>;
  overEnd: ReturnType<typeof createOverEnd>;
} | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  const { fallIntervalRef, clearFallInterval } = useFallInterval();

  const start = useMemo(() => createStart(store, dispatch), [store, dispatch]);
  const updatePoint = useMemo(
    () => createUpdatePoint(store, dispatch),
    [store, dispatch]
  );
  const pause = useMemo(
    () => createPause(dispatch, clearFallInterval),
    [dispatch, clearFallInterval]
  );
  const overStart = useMemo(
    () => createOverStart(dispatch, clearFallInterval),
    [dispatch, clearFallInterval]
  );
  const overEnd = useMemo(() => createOverEnd(dispatch), [dispatch]);
  const clearLines = useMemo(
    () => createClearLines(store, dispatch, updatePoint),
    [store, dispatch, updatePoint]
  );
  const nextAround = useMemo(
    () =>
      createNextAround(
        store,
        dispatch,
        clearFallInterval,
        updatePoint,
        overStart
      ),
    [store, dispatch, clearFallInterval, updatePoint, overStart]
  );
  const autoFall = useMemo(
    () => createAutoFall(store, dispatch, nextAround),
    [store, dispatch, nextAround]
  );

  useEffect(() => {
    if (store.moveBlock && !store.pause) {
      clearFallInterval();
      fallIntervalRef.current = setTimeout(
        autoFall,
        speeds[store.speedRun - 1]
      );
    }
    // 依赖项：仅当这些值变化时才重新执行
    return () => clearFallInterval(); // 组件卸载或依赖变化时清除定时器
  }, [
    store.moveBlock,
    store.pause,
    store.speedRun,
    autoFall,
    fallIntervalRef,
    clearFallInterval,
  ]);

  return (
    <>
      <StoreContext value={store}>
        <StoreDispatchContext
          value={{
            start,
            autoFall,
            nextAround,
            updatePoint,
            clearLines,
            pause,
            overStart,
            overEnd,
          }}
        >
          {children}
        </StoreDispatchContext>
      </StoreContext>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  return useContext(StoreContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreDispatch() {
  return useContext(StoreDispatchContext);
}
