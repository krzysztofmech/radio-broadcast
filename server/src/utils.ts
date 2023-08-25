import Fs from "fs";
import { extname } from "path";

const _readDir = () => Fs.readdirSync(process.cwd(), { withFileTypes: true });
const _isMp3 = (item: any) => item.isFile && extname(item.name) === ".mp3";

export const readSong = () => _readDir().filter(_isMp3)[0].name;
export const readSongs = () =>
  _readDir()
    .filter(_isMp3)
    .map((songItem) => songItem.name);

export const discardFirstWord = (str: string) =>
  str.substring(str.indexOf(" ") + 1);
export const getFirstWord = (str: string) => str.split(" ")[0];

export const generateRandomId = () => Math.random().toString(36).slice(2);
