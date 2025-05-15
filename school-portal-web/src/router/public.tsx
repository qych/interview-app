import { lazy } from 'react';
import { Url } from '../constants';

// TODO #1: Fix Frontend Routing
interface PublicRouteProps {
  path: string;
  children: JSX.Element;
}

const ClassesPage = lazy(() => import('../pages/ClassesPage'));
const ClassPage = lazy(() => import('../pages/ClassPage'));
const TeacherPage = lazy(() => import('../pages/TeacherPage'));

export const publicRoutes: PublicRouteProps[] = [
  {
    path: Url.CLASSES,
    children: <ClassesPage />
  },
  {
    path: Url.ADD_CLASS,
    children: <ClassPage />
  },
  {
    path: Url.ADD_TEACHER,
    children: <TeacherPage />
  }
];
