const eventName: Record<string, NodeJS.Timeout> = {};

interface KeyBoardEventHandler {
  key: "left" | "right" | "rotate" | "down" | "space" | "s" | "r" | "p";
  once?: boolean;
  begin?: number;
  interval?: number;
  callBack?: (clear?: () => void) => void;
}

const clearAll = () => {
  for (const key in eventName) {
    clearTimeout(eventName[key]);
    delete eventName[key];
  }
};

// keydown
const down = (o: KeyBoardEventHandler) => {
  clearAll();

  if (!o.callBack) {
    return;
  }
  const clear = () => {
    clearTimeout(eventName[o.key]);
  };
  o.callBack(clear);

  if (o.once === true) {
    return;
  }
  let begin: number | null = o.begin || 100;
  const interval = o.interval || 50;
  const loop = () => {
    eventName[o.key] = setTimeout(() => {
      begin = null;
      loop();
      o.callBack?.(clear);
    }, begin || interval);
  };
  loop();
};

// keyup
const up = (o: KeyBoardEventHandler) => {
  clearTimeout(eventName[o.key]);
  delete eventName[o.key];
  if (!o.callBack) {
    return;
  }
  o.callBack();
};

export default {
  down,
  up,
  clearAll,
};
