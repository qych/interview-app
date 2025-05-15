import { apiService } from '.'
import { ClassListRes, CreateClassReq } from 'school-portal-common';

export class ClassService {

  async getClasses() {
    const { data } = await apiService.get<ClassListRes[]>('/classes');
    return data;
  }

  async createClass(req: CreateClassReq) {
    return apiService.post<void>('/classes', req);
  }

}
