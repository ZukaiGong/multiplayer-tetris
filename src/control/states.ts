import { useStoreDispatch } from "@/store/index";
import { actions } from "@/store/actions";

import type { Matrix } from "@/types";

function getStartMatrix(): Matrix {
  return [];
}

export default function useStates() {
  const storeDispatch = useStoreDispatch();

  return {
    // 游戏开始
    start: () => {
      const startMatrix = getStartMatrix();
      storeDispatch(actions.matrix(startMatrix));
    },
  };
}
