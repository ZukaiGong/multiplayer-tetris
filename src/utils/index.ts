import { blockType } from "./constant";

export function getNextType() {
  return blockType[Math.floor(Math.random() * blockType.length)];
}
