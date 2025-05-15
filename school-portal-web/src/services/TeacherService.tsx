import { apiService } from '.'
import { BriefTeacherRes, CreateTeacherReq, TeacherListRes } from 'school-portal-common';

// Hint for TODO #5: Populate FE dropdown with existing teachers

export class TeacherService {

  async getTeachers() {
    const { data } = await apiService.get<TeacherListRes[]>('/teachers');
    return data;
  }

  async createTeacher(req: CreateTeacherReq) {
    return apiService.post<void>('/teachers', req);
  }

  async getTeacherOptions() {
    const { data } = await apiService.get<BriefTeacherRes[]>('/teachers/options');
    return data;
  }

}
