import { useStore, useStoreDispatch } from "@/store/index";
import { actions } from "@/store/actions";
import { blankLine } from "@/utils/constant";

import type { Matrix } from "@/types";

function getStartMatrix(startLines: number): Matrix {
  // TODO: 游戏开始时，随机生成startLines行填充
  const startMatrix = [];
  for (let i = 0, len = 20 - startLines; i < len; i++) {
    startMatrix.unshift([...blankLine]);
  }
  return startMatrix;
}

export default function useStates() {
  const store = useStore();
  const storeDispatch = useStoreDispatch();

  return {
    // 游戏开始
    start() {
      const startMatrix = getStartMatrix(0);
      storeDispatch(actions.matrix(startMatrix));
      storeDispatch(
        actions.moveBlock({ blockParam: { type: store.nextBlock } })
      );
      storeDispatch(actions.nextBlock());
      this.auto();
    },

    // 自动下落
    auto() {},
  };
}
