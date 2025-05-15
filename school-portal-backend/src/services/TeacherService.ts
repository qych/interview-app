import { CreateTeacherReq, StringUtil } from 'school-portal-common';
import { teacherRepo } from '../repositories';
import { Teacher } from '../entities';
import { sequelize } from '../sequelize';

export class TeacherService {

  async createTeacher(req: CreateTeacherReq): Promise<void> {
    const { email } = req;

    const transaction = await sequelize.getTransaction();

    console.log(`Creating teacher with email [${email}]`);

    try {
      const teacher = await teacherRepo.findOne({ where: { email } });

      if (teacher) {
        throw new Error('Email already in use by another teacher.');
      }

      await teacherRepo.create({ ...req, uuid: StringUtil.generateUuid() }, transaction);

      await transaction.commit();

      console.log(`Teacher with email [${email}] created`);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getTeachers(): Promise<Teacher[]> {
    console.log('Retrieving teachers');

    try {
      const data = await teacherRepo.findAll()
      console.log(`Retrieved teachers, total ${data.length} records`);
      return data;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
