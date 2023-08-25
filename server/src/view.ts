import NeoBlessed from "neo-blessed";

import {
  buildPlaylist,
  getFocusedSong,
  handlePlaylistScroll,
} from "./services/playlist";
import {
  buildQueue,
  createAndAppendToQueue,
  queueOnMove,
  queueOnScroll,
  removeFromQueue,
} from "./services/queue";
import { buildControls, setQueueTips } from "./services/controls";
import { buildNowPlaying } from "./services/nowPlaying";
import { keys } from "./keys";
import { discardFirstWord } from "./utils";
import { blur, focus } from "./boxEvents";

export const view = async () => {
  const screen = NeoBlessed.screen({ smartSCR: true });
  screen.title = "tunetalk";
  screen.key(["escape", "C-c"], () => process.exit(0));

  const controls = buildControls();
  const queue = buildQueue(screen);
  const playlist = buildPlaylist(screen, queue, controls);
  const nowPlaying = buildNowPlaying();

  // playlist event listeners
  playlist.key(keys.SCROLL_UP, handlePlaylistScroll);
  playlist.key(keys.SCROLL_DOWN, handlePlaylistScroll);
  playlist.key(keys.QUEUE_ADD, () => {
    const focusedSong = getFocusedSong(playlist);
    const formattedSong = discardFirstWord(focusedSong);
    createAndAppendToQueue(queue, formattedSong);
    renderScreen(screen);
  });
  playlist.key(keys.FOCUS_QUEUE, () => {
    blur(playlist);
    focus(queue);
    setQueueTips(controls);
    renderScreen(screen);
  });

  // queue event listeners
  queue.key(keys.SCROLL_UP, queueOnScroll(queue, keys.SCROLL_UP, screen));
  queue.key(keys.SCROLL_DOWN, queueOnScroll(queue, keys.SCROLL_UP, screen));
  queue.key(keys.MOVE_UP, queueOnMove(queue, keys.MOVE_UP, screen));
  queue.key(keys.MOVE_DOWN, queueOnMove(queue, keys.MOVE_DOWN, screen));
  queue.key(keys.QUEUE_REMOVE, () => {
    removeFromQueue();
    focus(queue);
    renderScreen(screen);
  });
  queue.key(keys.FOCUS_PLAYLIST, () => {
    queue.blur();
    playlist.focus();
    controls.setPlaylistTips();
    renderScreen(screen);
  });

  screen.append(controls);
  screen.append(queue);
  screen.append(playlist);
  screen.append(nowPlaying);
  renderScreen(screen);
};

// queue streams

// queue.stream.on("play", (song) => {
//   playlist.focus();
//   nowPlaying.createBoxChildAndAppend(song);
//   view.render();
// });

export const renderScreen = (screen: any) => {
  screen.render();
};
