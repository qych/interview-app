import { Includeable } from "sequelize";
import { Class, Teacher } from "../entities";
import { BaseRepo, IncludeOptions, RepoOptions } from "./BaseRepo";
import { classRepo } from ".";

export type TeacherInclude = 'formClass';

export interface TeacherRepoOptions extends RepoOptions<TeacherInclude> {
  formClass?: IncludeOptions;
}

export class TeacherRepo extends BaseRepo<Teacher, TeacherInclude, TeacherRepoOptions> {
  constructor() {
    super(Teacher);
  }

    override constructInclude(options?: TeacherRepoOptions) {
      const includes: Includeable[] = [];

      options?.includes?.forEach(include => {
        if (include === 'formClass') {
          includes.push({
            ...options.formClass,
            model: Class,
            include: classRepo.constructInclude({ formTeacher: options.formClass })
          });
        }
      });

      return includes;
    }
}
