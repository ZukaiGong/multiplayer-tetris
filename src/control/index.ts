import { useEffect } from "react";
import todo from "./todo";

import type { StoreContext } from "@/store/storeReducer";
import type { IStoreDispatchContext } from "@/store/index";

const keyboard = {
  37: "left",
  38: "rotate",
  39: "right",
  40: "down",
  32: "space",
  83: "s",
  82: "r",
  80: "p",
} as const;

let keydownActive: string;

const boardKeys = new Set(
  Object.keys(keyboard).map((key) => parseInt(key, 10))
);

export default function useControl(
  store: StoreContext,
  storeDispatch: IStoreDispatchContext
) {
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      // KeyboardEvent.metaKey 为只读属性，返回一个 布尔值，
      // 在事件发生时，用于指示 Meta 键（Command键/Windows键）是按下状态（true），还是释放状态（false）。
      if (e.metaKey || !boardKeys.has(e.keyCode)) return;
      const type = keyboard[e.keyCode as keyof typeof keyboard];
      if (type === keydownActive) {
        return;
      }
      keydownActive = type;
      todo[type]?.down(store, storeDispatch);
    };

    const keyUp = (e: KeyboardEvent) => {
      if (e.metaKey || !boardKeys.has(e.keyCode)) return;
      const type = keyboard[e.keyCode as keyof typeof keyboard];
      if (type === keydownActive) {
        keydownActive = "";
      }
      todo[type]?.up(storeDispatch);
    };

    document.addEventListener("keydown", keyDown, true);
    document.addEventListener("keyup", keyUp, true);

    // 如果解绑时不传第三个参数，浏览器会认为这是两个不同的事件绑定
    return () => {
      document.removeEventListener("keydown", keyDown, true);
      document.removeEventListener("keyup", keyUp, true);
    };
  }, [store, storeDispatch]);
}
