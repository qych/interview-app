import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request } from "express";
import { ClassListRes, CreateClassReq } from "school-portal-common";
import { AutoRespond, handleValidation } from "../api";
import { classService } from "../services";
import { toClassListRes } from "../transformers";
import { validateString } from "../utils";

@Controller('classes')
export class ClassController {

  @Post()
  @AutoRespond()
  @Middleware([
    validateString.body('level', { maxLength: 255 }),
    validateString.body('name', { maxLength: 255 }),
    handleValidation()
  ])
  async createTeacher(req: Request): Promise<void> {
    const input: CreateClassReq = req.body;
    await classService.createClass(input);
  }

  @Get()
  @AutoRespond()
  async getTeachers(): Promise<ClassListRes[]> {
    const data = await classService.getClasses();
    return data.map(clazz => toClassListRes(clazz));
  }

}
