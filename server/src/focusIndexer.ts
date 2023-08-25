export let index: number = 1;
export let getIndexLimit: number;
export const focusIndexer = (indexLimit: number) => {
  getIndexLimit = indexLimit;
};

export const incr = () => {
  index < getIndexLimit && index++;
};

export const decr = () => {
  index > 1 && index--;
};
