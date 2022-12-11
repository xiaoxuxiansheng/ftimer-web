import request from './index'

import {
  Response,
  GetAppTimersReq,
  GetAppTimersResp,
  GetTimerResp,
  GetTasksResp,
  CreateTimerResp,
  TimerType,
} from './type';

export const getAppTimers = async (params: GetAppTimersReq): Promise<GetAppTimersResp> => {
  return request.get("/api/timer/v1/defs", {
    method: "get",
    params: params,
  });
}

export const getTimer = async (app: string,id: number): Promise<GetTimerResp> => {
  return request.get("/api/timer/v1/def", {
    method: "get",
    params: {"id":id,"app":app},
  });
};

export const getTasks = async (timerID: number): Promise<GetTasksResp> => {
  return request.get("/api/task/v1/records", {
    method: "get",
    params: {"timerID":timerID},
  });
};

export const enableTimer = async(app: string, timerID :number):Promise<Response> =>{
  return request.post("/api/timer/v1/enable", {"id":timerID,"app":app});
}

export const unableTimer = async(app: string, timerID :number):Promise<Response> =>{
  return request.post("/api/timer/v1/unable", {"id":timerID,"app":app});
}

export const deleteTimer = async(app: string, timerID: number):Promise<Response> =>{
  return request.delete("/api/timer/v1/def", {
    method:"delete",
    data:{"id":timerID,"app":app}
  });
}

export const createTimer = async (data: TimerType): Promise<CreateTimerResp> =>{
  return request.post("/api/timer/v1/def", data);
}

export const getTimersByName = async(params: GetAppTimersReq):Promise<GetAppTimersResp> => {
  return request.get("/api/timer/v1/defsByName", {
    method: "get",
    params: {
      "app":params.app,
      "fuzzyName":params.name,
      "pageIndex":params.pageIndex,
      "pageSize":params.pageSize,
    },
  });
}