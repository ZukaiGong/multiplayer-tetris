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
export const blockType = Object.keys(blockShape) as Readonly<
  Array<keyof typeof blockShape>
>;

// 这个对象用于定义每种方块在旋转时的旋转中心点（原点）。
export const origin = {
  I: [
    [-1, 1],
    [1, -1],
  ],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1],
  ],
} as const;

export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] as const;

export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const;

export const blankMatrix: Readonly<(typeof blankLine)[]> = (() => {
  const matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine);
  }
  return matrix;
})();

export const speeds = [800, 650, 500, 370, 250, 160] as const;

export const clearPoints = [100, 300, 700, 1500] as const; // 消除不同的行数的得分

export const eachLines = 20; // 每消除eachLines行, 增加速度

export const delays = [50, 60, 70, 80, 90, 100] as const;
