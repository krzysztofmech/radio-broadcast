import { box } from "../box";
import { configs } from "../configs";

export const buildNowPlaying = () => {
  const nowPlaying = box(configs.nowPlaying.config);

  return nowPlaying;
};
