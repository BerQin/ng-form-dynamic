import {SharedHeader} from './shared';

export interface HomeInfo {
  sharedHeader: SharedHeader;
  option: any;
  isHover?: boolean;
  callBack?: Function;
  legendEvent?: Function;
}

export interface Variables {
  duration: Duration;
  topN?: number;
  callType?: string;
}

export interface Duration {
  start: string;
  end: string;
  step: 'HOUR' | 'MINUTE' | 'DAY';

}

/**
 * 调用api参数
 */
export interface HomeParam {
  variables: Variables;
  query: string;
}

