import { IBoxConfig } from "./IBoxConfig";
import { box } from "./box";
export const boxItem = (parentBox: any, config: IBoxConfig) => {
  const childConfig = config.childConfig!.childCommonConfig;
  const bgBlur = config.bgBlur;
  const bgFocus = config.bgFocus;
  // const focusIndexer = getNavigationLimit(box);

  const boxItem = box(childConfig);
};

const getNavigationLimit = (box: any) => {
  return Math.min(box.children.length - 1, getHeight(box));
};

const getHeight = (box: any) => {
  return box.height - 2;
};
