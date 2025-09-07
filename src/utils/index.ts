import { blockType } from "./constant";
import Block from "./block";
import type { Matrix } from "@/types";

// 随机获取下一个方块的类型
export function getNextType() {
  return blockType[Math.floor(Math.random() * blockType.length)];
}

// 判断方块是否能移到指定位置
export function want(
  next: Required<ConstructorParameters<typeof Block>[0]>,
  matrix: Matrix
) {
  const xy = next.xy;
  const shape = next.shape;
  const horizontal = shape[0].length;
  return shape.every((m, i) =>
    m.every((n, j) => {
      if (xy[1] < 0) return false; // left
      if (xy[1] + horizontal > 10) return false; // right
      if (xy[0] + i < 0) return true; // top
      if (xy[0] + i >= 20) return false; // bottom
      if (n) {
        return matrix[xy[0] + i][xy[1] + j] ? false : true;
      }
      return true;
    })
  );
}
