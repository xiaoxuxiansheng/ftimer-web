export interface GetAppTimersReq {
  app: string;
  name?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface GetAppTimersResp {
  code: number;
  msg: string;
  data: TimerType[];
  total: number;
}

export interface GetTimerResp {
  code: number;
  msg: string;
  data: TimerType;
}

export interface TimerType {
  app: string,
  id: number,
  creator?: string,
  name: string,
  cron: string,
  status: TimerStatusType,
  notifyHTTPParam?: NotifyHTTPParam,
}

export interface CreateTimerResp{
  code: number,
  msg:string,
  id:number,
}

export interface NotifyHTTPParam {
  url: string,
  header?: string,
  method: string,
  body?: string,
}

export enum TimerStatusType {
  unabled = 1,
  enabled = 2,
};

export enum TaskStatusType {
  notRunned = 0,
  running = 1,
  successed = 2,
  failed = 3,
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export interface Response {
  code: number;
  msg: string;
};


export interface TaskType {
  id: number;
  timerID: number;
  ouput?: string;
  runTimer?: string;
  costTime?: number;
  status: TaskStatusType;
}

export interface GetTasksResp {
  code: number;
  msg: string;
  data: TaskType[];
  total: number;
}


