import { ClassLevel } from "../constants";

export interface CreateClassReq {
  level: ClassLevel;
  name: string;
}

export interface ClassListRes {
  level: string;
  name: string;
}
