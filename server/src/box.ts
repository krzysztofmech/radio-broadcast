import NeoBlessed from "neo-blessed";
import {
  IBaseConfig,
  IBoxConfig,
  IChildCommonConfig,
} from "./interfaces/IBoxConfig";
import { decr, incr, index } from "./focusIndexer";
import { keys } from "./keys";
import { discardFirstWord, getFirstWord } from "./utils";
import { focus } from "./boxEvents";

export const box = (config: IBaseConfig | IChildCommonConfig) => {
  const box = NeoBlessed.box(config);

  return box;
};

export const buildBoxItem = (parentBox: any, config: IBoxConfig) => {
  const childConfig = config.childConfig!.childCommonConfig;
  const focusIndexer = getNavigationLimit(parentBox);

  const boxItem = box(childConfig);
  return boxItem;
};

const getNavigationLimit = (parentBox: any) => {
  return Math.min(parentBox.children.length - 1, getHeight(parentBox));
};

const getHeight = (parentBox: any) => {
  return parentBox.height - 2;
};

const handleFocusChild = (parentBox: any, config: IBoxConfig) => {
  setActiveChildColor(parentBox, config.bgFocus!);
  focus(parentBox);
};

const setActiveChildColor = (parentBox: any, color: string) => {
  const activeChild = parentBox.children[index];
  if (activeChild) {
    activeChild.style.bg = color;
  }
};

export const appendBoxItems = (parentBox: any, children: any[]) => {
  children.forEach((child) => {
    parentBox.append(child);
  });
};

export const removeFromBoxChildren = (box: any, index: number): any => {
  const child = box.children[index];
  const content = child && child.content;

  if (!content) {
    return {};
  }

  discardFromBox(box, index);
  orderBoxChildren(box);
  decr();
};

export const changeOrderInBoxChildren = (
  parentBox: any,
  key: string,
  config: IBoxConfig
) => {
  const index1 = index;
  const child1 = parentBox.children[index1];
  child1.style.bg = config.bgBlur;

  if (key === keys.MOVE_UP) {
    decr();
  } else if (key === keys.MOVE_DOWN) {
    incr();
  }

  const index2 = index;
  const child2 = parentBox.children[index2];
  child2.style.bg = config.bgFocus;

  [child1.content, child2.content] = [
    `${getFirstWord(child1.content)} ${discardFirstWord(child2.content)}`,
    `${getFirstWord(child2.content)} ${discardFirstWord(child1.content)}`,
  ];

  return { index1, index2 };
};

const discardFromBox = (parentBox: any, index: number) => {
  parentBox.remove(parentBox.children[index]);
};

const orderBoxChildren = (parentBox: any) => {
  parentBox.children.forEach((child: any, index: number) => {
    if (index !== 0) {
      child.top = index - 1;
      child.content = `${index}. ${discardFirstWord(child.content)}`;
    }
  });
};
