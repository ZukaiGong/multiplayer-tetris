import { useStore, useStoreDispatch } from "@/store/index";

import style from "./index.module.css";

export default function ControlButtons() {
  const store = useStore();
  const gameStates = useStoreDispatch();

  // 开始或结束游戏
  function handleStartOrOver() {
    if (!store.moveBlock) gameStates?.start();
    else {
      gameStates?.overStart();
      gameStates?.overEnd();
    }
  }

  // 切换暂停
  function handleTogglePause() {
    gameStates?.pause(!store.pause);
  }

  return (
    <>
      <div className={style["buttons-wrapper"]}>
        <button onClick={handleStartOrOver}>
          {store.moveBlock ? "结束" : "开始"}
        </button>
        {store.moveBlock && (
          <button onClick={handleTogglePause}>
            {store.pause ? "继续" : "暂停"}
          </button>
        )}
      </div>
    </>
  );
}
