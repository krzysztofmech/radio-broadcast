import { box, changeOrderInBoxChildren, removeFromBoxChildren } from "../box";
import { createBoxChildAndAppend, scroll } from "../boxEvents";
import { configs } from "../configs";
import { song } from "../types/song";
import { renderScreen } from "../view";
import { index as currIndex } from "../focusIndexer";

const songs: song[] = [];

export const buildQueue = (screen: any) => {
  const queue = box(configs.queue.config);

  return queue;
};

export const queueOnScroll = (box: any, scrollKey: string, screen: any) => {
  scroll(box, scrollKey);
  renderScreen(screen);
};

export const queueOnMove = (box: any, key: string, screen: any) => {
  changeOrderQueue(box, key);
  renderScreen(screen);
};

const changeOrderQueue = (box: any, key: string) => {
  if (box.children.length === 1) {
    return;
  }
  const { index1, index2 } = changeOrderInBoxChildren(box, key, configs.queue);
  changeOrderInSongs(index1, index2);
};

const changeOrderInSongs = (
  boxChildrenIndex1: number,
  boxChildrenIndex2: number
) => {
  const songsArrayIndex1 = boxChildrenIndexToSongsIndex(boxChildrenIndex1);
  const songsArrayIndex2 = boxChildrenIndexToSongsIndex(boxChildrenIndex2);
  [songs[songsArrayIndex1], songs[songsArrayIndex2]] = [
    songs[songsArrayIndex2],
    songs[songsArrayIndex1],
  ];
};

const boxChildrenIndexToSongsIndex = (index: number) => {
  return index - 1;
};

export const createAndAppendToBoxChildren = (box: any, song: song) => {
  createBoxChildAndAppend(box, song);
};

export const createAndAppendToSongs = (song: song) => {
  songs.push(song);
};

export const createAndAppendToQueue = (queue: any, song: song) => {
  createAndAppendToBoxChildren(queue, song);
  createAndAppendToSongs(song);
};

export const removeFromQueue = ({ fromTop }: any = {}) => {
  const index: number = fromTop ? 1 : currIndex;

  removeFromBoxChildren(box, index);
  const [song] = removeFromSongs(index);
  return song;
};

const removeFromSongs = (index: number) => {
  const adjustedIndex = boxChildrenIndexToSongsIndex(index);
  return songs.splice(adjustedIndex, 1);
};
