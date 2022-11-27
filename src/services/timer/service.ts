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

export const getTimer = async (id: number): Promise<GetTimerResp> => {
  return request.get("/api/timer/v1/def", {
    method: "get",
    params: {"id":id},
  });
};

export const getTasks = async (timerID: number): Promise<GetTasksResp> => {
  return request.get("/api/task/v1/records", {
    method: "get",
    params: {"timerID":timerID},
  });
};

export const enableTimer = async(timerID :number):Promise<Response> =>{
  return request.post("/api/timer/v1/enable", {"id":timerID});
}

export const unableTimer = async(timerID :number):Promise<Response> =>{
  return request.post("/api/timer/v1/unable", {"id":timerID});
}

export const deleteTimer = async(timerID: number):Promise<Response> =>{
  return request.delete("/api/timer/v1/def", {
    method:"delete",
    data:{"id":timerID}
  });
}

export const createTimer = async (data: TimerType): Promise<CreateTimerResp> =>{
  return request.post("/api/timer/v1/def", data);
}