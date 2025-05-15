import { env } from '../env'
import { ChildControllers, Controller } from '@overnightjs/core';
import { TeacherController } from './TeacherController';
import { ClassController } from './ClassController';

const childControllers: any[] = [
  new ClassController(),
  new TeacherController()
];

@Controller(env.api.path)
@ChildControllers(childControllers)
class Controllers {
}

export const controllers = new Controllers();