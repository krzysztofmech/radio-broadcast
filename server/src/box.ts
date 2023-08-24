import NeoBlessed from "neo-blessed";
import { IBaseConfig, IChildCommonConfig } from "./IBoxConfig";

export const box = (config: IBaseConfig | IChildCommonConfig) => {
  return NeoBlessed.box(config);
};
