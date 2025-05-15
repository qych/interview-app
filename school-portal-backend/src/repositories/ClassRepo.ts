import { Includeable } from "sequelize";
import { Class, Teacher } from "../entities";
import { BaseRepo, IncludeOptions, RepoOptions } from "./BaseRepo";
import { teacherRepo } from ".";

export type ClassInclude = 'formTeacher';

export interface ClassRepoOptions extends RepoOptions<ClassInclude> {
  formTeacher?: IncludeOptions;
}

export class ClassRepo extends BaseRepo<Class, ClassInclude, ClassRepoOptions> {
  constructor() {
    super(Class);
  }

  override constructInclude(options?: ClassRepoOptions) {
    const includes: Includeable[] = [];

    options?.includes?.forEach(include => {
      if (include === 'formTeacher') {
        includes.push({
          ...options.formTeacher,
          model: Teacher,
          include: teacherRepo.constructInclude({ formClass: options.formTeacher })
        });
      }
    });

    return includes;
  }
}
