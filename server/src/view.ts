import NeoBlessed from "neo-blessed";
import { box } from "./box";
import { configs } from "./configs";
import { keys } from "./keys";

export const view = async () => {
  const screen = NeoBlessed.screen({ smartSCR: true });
  screen.title = "tunetalk";
  screen.key(["escape", "C-c"], () => process.exit(0));

  const controls = box(configs.controls.config);
  controls.content =
    `${keys.FOCUS_QUEUE} - focus queue | ${keys.SCROLL_UP} - go up\n` +
    `${keys.QUEUE_ADD} - enqueue song | ${keys.SCROLL_DOWN} - go down\n` +
    `${keys.MOVE_UP} - move song up | ${keys.SCROLL_UP}-go up\n` +
    `${keys.MOVE_DOWN} - move song down | ${keys.SCROLL_DOWN}-go down\n` +
    `${keys.FOCUS_PLAYLIST} - focus playlist | ${keys.QUEUE_REMOVE} - dequeue son`;
  const nowPlaying = box(configs.nowPlaying.config);
  const playlist = box(configs.playlist.config);
  const queue = box(configs.queue.config);

  screen.append(controls);
  screen.append(nowPlaying);
  screen.append(playlist);
  screen.append(queue);
  screen.render();
};
