import { Subject } from "../constants";

// TODO #2: Fix Error on "Add Teacher" page
export interface CreateTeacherReq {
  name: string;
  email: string;
  mobileNumber: string;
  subject: Subject;
}

export interface BriefTeacherRes {
  name: string;
  email: string;
}

export interface TeacherListRes extends BriefTeacherRes {
  contactNumber: string;
  subject: string;
}
