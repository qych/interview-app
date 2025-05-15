import { Teacher } from "../entities";
import { BriefTeacherRes, TeacherListRes } from "school-portal-common";

export const toTeacherListRes = (teacher: Teacher): TeacherListRes => ({
  name: teacher.name,
  email: teacher.email,
  subject: teacher.subject,
  contactNumber: teacher.contactNumber
});

export const toBriefTeacherResLessEmail = (teacher: Teacher): Omit<BriefTeacherRes, 'email'> => {
  const { name } = teacher;
  return { name };
};

export const toBriefTeacherRes = (teacher: Teacher): BriefTeacherRes => {
  const { name, email } = teacher;
  return { name, email };
};
