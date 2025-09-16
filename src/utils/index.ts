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

// 判断是否有能消除的行，如果有返回行索引
export function isClear(matrix: Matrix) {
  const clearLines: number[] = [];
  matrix.forEach((m, rowIdx) => {
    if (m.every((n) => !!n)) {
      clearLines.push(rowIdx);
    }
  });
  return clearLines.length > 0 ? clearLines : false;
}

// 游戏是否结束，以第一行落下方块为依据
export function isOver(matrix: Matrix) {
  return matrix[0].some((m) => !!m);
}
