import { box } from "../box";
import { configs } from "../configs";
import { keys } from "../keys";

export const buildControls = () => {
  const controls = box(configs.controls.config);
  controls.content = setPlaylistTips();

  return controls;
};

export const setPlaylistTips = () => {
  return (
    `${keys.FOCUS_QUEUE} - focus queue | ${keys.SCROLL_UP} - go up\n` +
    `${keys.QUEUE_ADD} - enqueue song | ${keys.SCROLL_DOWN} - go down\n`
  );
};
export const setQueueTips = (controls: any) => {
  controls.content =
    `${keys.MOVE_UP} - move song up | ${keys.SCROLL_UP}-go up\n` +
    `${keys.MOVE_DOWN} - move song down | ${keys.SCROLL_DOWN}-go down\n` +
    `${keys.FOCUS_PLAYLIST} - focus playlist | ${keys.QUEUE_REMOVE} - dequeue son`;
  return controls;
};
