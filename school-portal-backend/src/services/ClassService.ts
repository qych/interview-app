import { CreateClassReq, StringUtil } from 'school-portal-common';
import { classRepo } from '../repositories';
import { sequelize } from '../sequelize';
import { Class } from '../entities';

export class ClassService {

  async createClass(req: CreateClassReq): Promise<void> {
    const { name, level } = req;

    const transaction = await sequelize.getTransaction();

    try {
      const clazz = await classRepo.findOne({ where: { name } });

      if (clazz) {
        throw new Error('Class with same name already present in system.');
      }

      await classRepo.create({
        level,
        name,
        uuid: StringUtil.generateUuid()
      }, transaction);

      await transaction.commit();

      console.log(`Created class [${name}]`);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getClasses(): Promise<Class[]> {
    console.log('Retrieving classes');

    try {
      const data = await classRepo.findAll();
      console.log(`Retrieved classes, total ${data.length} records`);
      return data;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
