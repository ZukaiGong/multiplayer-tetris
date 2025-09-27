import { useRef, useCallback } from "react";

export default function useFallInterval() {
  // 自动下落setTimeout变量
  const fallIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 清除定时器
   */
  const clearFallInterval = useCallback(() => {
    if (fallIntervalRef.current) {
      clearTimeout(fallIntervalRef.current);
      fallIntervalRef.current = null;
    }
  }, []);

  return {
    fallIntervalRef,
    clearFallInterval,
  };
}
