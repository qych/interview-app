import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request } from "express";
import { CreateTeacherReq, TeacherListRes } from 'school-portal-common';
import { AutoRespond, handleValidation } from "../api";
import { teacherService } from "../services";
import { toTeacherListRes } from "../transformers";
import { validateEmail, validateString } from "../utils";

// TODO #3: Add BE validation for contact number

@Controller('teachers')
export class TeacherController {

  @Post()
  @AutoRespond()
  @Middleware([
    validateString.body('name', { maxLength: 255 }),
    validateEmail.body('email'),
    validateString.body('subject', { maxLength: 255 }),
    handleValidation()
  ])
  async createTeacher(req: Request): Promise<void> {
    const input: CreateTeacherReq = req.body;
    await teacherService.createTeacher(input);
  }

  @Get()
  @AutoRespond()
  async getTeachers(): Promise<TeacherListRes[]> {
    const data = await teacherService.getTeachers();
    return data.map(teacher => toTeacherListRes(teacher));
  }
}
