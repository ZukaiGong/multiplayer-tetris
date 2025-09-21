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

const keyDown = (e: KeyboardEvent) => {
  // KeyboardEvent.metaKey 为只读属性，返回一个 布尔值，
  // 在事件发生时，用于指示 Meta 键（Command键/Windows键）是按下状态（true），还是释放状态（false）。
  if (e.metaKey || !boardKeys.has(e.keyCode)) return;
  const type = keyboard[e.keyCode as keyof typeof keyboard];
  if (type === keydownActive) {
    return;
  }
  keydownActive = type;
  // todo[type].down(store);
};

const keyUp = (e: KeyboardEvent) => {
  if (e.metaKey || !boardKeys.has(e.keyCode)) return;
  const type = keyboard[e.keyCode as keyof typeof keyboard];
  if (type === keydownActive) {
    keydownActive = "";
  }
  // todo[type].up(store);
};

document.addEventListener("keydown", keyDown, true);
document.addEventListener("keyup", keyUp, true);
