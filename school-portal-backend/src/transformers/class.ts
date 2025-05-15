import { Class } from "../entities";
import { ClassListRes } from "school-portal-common";

export const toClassListRes = (clazz: Class): ClassListRes => {
  const { level, name } = clazz;
  return { level, name };
};
