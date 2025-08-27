// 方块的形状
export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
} as const;

// 方块类别列表
export const blockType: Readonly<string[]> = Object.keys(blockShape);

export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] as const;

export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const;

export const blankMatrix: Readonly<(typeof blankLine)[]> = (() => {
  const matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine);
  }
  return matrix;
})();
