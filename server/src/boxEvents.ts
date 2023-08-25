import NeoBlessed from "neo-blessed";
export const focus = (box: any) => {
  box.focus();
};

export const blur = (box: any) => {
  box.blur();
};
export const scroll = (box: any, scrollKey: string) => {
  box.scroll(scrollKey);
};
export const createBoxChildAndAppend = (box: any, content: any) => {
  const boxChild = NeoBlessed.box(content);
  box.append(boxChild);
};
