import { actions } from "@/store/actions";
import event from "@/utils/event";
import { delays, speeds } from "@/utils/constant";
import { want } from "@/utils/index";

import type { StoreContext } from "@/store/storeReducer";
import type { IStoreDispatchContext } from "@/store/index";

const down = (store: StoreContext, storeDispatch: IStoreDispatchContext) => {
  storeDispatch.dispatch(actions.keyboard.left(true));
  event.down({
    key: "left",
    begin: 200,
    interval: 100,
    callBack: () => {
      if (store.lock) {
        return;
      }
      // if (music.move) {
      //   music.move();
      // }
      const moveBlock = store.moveBlock;
      if (moveBlock !== null) {
        if (store.pause) {
          storeDispatch.pause(false);
          return;
        }
        const next = moveBlock.left();
        const delay = delays[store.speedRun - 1];
        let timeStamp;
        if (want(next, store.matrix)) {
          next.timeStamp += delay;
          storeDispatch.dispatch(actions.moveBlock({ blockParam: next }));
          timeStamp = next.timeStamp;
        } else {
          moveBlock.timeStamp += delay / 1.5; // 真实移动delay多一点，碰壁delay少一点
          storeDispatch.dispatch(actions.moveBlock({ blockParam: moveBlock }));
          timeStamp = moveBlock.timeStamp;
        }
        // remain表示操作完之后距离下一次下落还有多长时间，是为了保持下落速度一致。
        // const remain = speeds[store.speedRun - 1] - (Date.now() - timeStamp);
        // storeDispatch.autoFall(remain);
      } else {
        const speed = store.speedStart - 1 < 1 ? 6 : store.speedStart - 1;
        storeDispatch.dispatch(actions.speedStart(speed));
      }
    },
  });
};

const up = (storeDispatch: IStoreDispatchContext) => {
  storeDispatch.dispatch(actions.keyboard.left(false));
  event.up({ key: "left" });
};

export default {
  down,
  up,
};
