export enum KeyboardActionType {
  KEY_LEFT = "KEY_LEFT",
  KEY_RIGHT = "KEY_RIGHT",
}

export type KeyboardAction =
  | { type: KeyboardActionType.KEY_LEFT; data: boolean }
  | { type: KeyboardActionType.KEY_RIGHT; data: boolean };

export const keyboardActions = {
  left,
  right,
};

function left(data: boolean) {
  return {
    type: KeyboardActionType.KEY_LEFT,
    data,
  };
}

function right(data: boolean) {
  return {
    type: KeyboardActionType.KEY_RIGHT,
    data,
  };
}
