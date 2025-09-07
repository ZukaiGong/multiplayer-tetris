import { blockShape, origin } from "./constant";

type BlockShapeTypes = keyof typeof blockShape;
type BlockShapeValues = (typeof blockShape)[BlockShapeTypes];

/**
 * type：方块类型（如 I、L、J 等）。
 * rotateIndex：当前旋转状态索引，决定旋转中心点。
 * timeStamp：方块生成或操作的时间戳。
 * shape：方块的形状（二维数组，Immutable List）。
 * xy：方块在矩阵中的位置（x: 纵坐标, y: 横坐标）。
 *
 * 所有操作方法（rotate、fall、right、left）都返回新的方块状态对象，而不是直接修改当前实例，方便与 Redux/Immutable 数据流结合。
 */
export default class Block {
  type: BlockShapeTypes;
  rotateIndex: number;
  timeStamp: number;
  shape: BlockShapeValues;
  xy: [number, number];

  constructor(options: {
    type: BlockShapeTypes;
    rotateIndex?: number;
    timeStamp?: number;
    shape?: BlockShapeValues;
    xy?: [number, number];
  }) {
    this.type = options.type;

    if (!options.rotateIndex) {
      this.rotateIndex = 0;
    } else {
      this.rotateIndex = options.rotateIndex;
    }

    if (!options.timeStamp) {
      this.timeStamp = Date.now();
    } else {
      this.timeStamp = options.timeStamp;
    }

    // 有type了为什么还要有shape？
    // 现在这样不会导致shape和type不匹配吗？
    if (!options.shape) {
      // 深拷贝？
      this.shape = blockShape[options.type];
    } else {
      this.shape = options.shape;
    }

    // 设定起始坐标
    if (!options.xy) {
      switch (options.type) {
        case "I": // I
          this.xy = [0, 3];
          break;
        case "L": // L
          this.xy = [-1, 4];
          break;
        case "J": // J
          this.xy = [-1, 4];
          break;
        case "Z": // Z
          this.xy = [-1, 4];
          break;
        case "S": // S
          this.xy = [-1, 4];
          break;
        case "O": // O
          this.xy = [-1, 4];
          break;
        case "T": // T
          this.xy = [-1, 4];
          break;
        default:
          throw new Error("wrong block type");
      }
    } else {
      this.xy = options.xy;
    }
  }

  rotate() {
    const result: number[][] = [];

    // 逆时针旋转
    this.shape.forEach((m) =>
      m.forEach((n, i) => {
        const index = m.length - 1 - i;
        if (!result[index]) {
          result[index] = [];
        }
        result[index].push(n);
      })
    );

    // 旋转后，调整坐标位置
    const curOrigin = origin[this.type][this.rotateIndex];
    const nextXy = [this.xy[0] + curOrigin[0], this.xy[1] + curOrigin[1]] as [
      number,
      number
    ];

    // 更新旋转状态计数器
    const nextRotateIndex =
      this.rotateIndex + 1 >= origin[this.type].length
        ? 0
        : this.rotateIndex + 1;

    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp,
    };
  }

  fall(n = 1) {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0] + n, this.xy[1]] as [number, number],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now(),
    };
  }

  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] + 1] as [number, number],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }

  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] - 1] as [number, number],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
}
