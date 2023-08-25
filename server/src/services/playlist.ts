import { setQueueTips } from "./controls";
import { index } from "../focusIndexer";
import { keys } from "../keys";
import { createAndAppendToQueue } from "./queue";
import { box } from "../box";
import { configs } from "../configs";

export const buildPlaylist = (screen: any, queue: any, controls: any) => {
  const playlist = box(configs.playlist.config);

  return playlist;
};

export const handlePlaylistScroll = () => {
  scroll();
};

const scroll = () => {};

export const getFocusedSong = (box: any) => {
  const child = box.children[index];
  return child && child.content;
};
