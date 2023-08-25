export interface IBoxConfig {
  bgFocus?: string;
  bgBlur?: string;
  config: IBaseConfig;
  childConfig?: {
    childCommonConfig: IChildCommonConfig;
    fg: string;
    bg: string;
  };
}

export interface IBaseConfig {
  commonConfig: ICommonConfig;
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
  scrollable?: boolean;
  label: string;
  style: {
    fg: string;
    bg: string;
    border: {
      fg: string;
    };
  };
}
interface ICommonConfig {
  border: {
    type: string;
  };
}

export interface IChildCommonConfig {
  width: string;
  height: number;
  left: number;
}
