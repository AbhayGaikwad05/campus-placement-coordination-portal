import { INITIAL_STUDENTS } from '../services/seedData';

export const studentsData = INITIAL_STUDENTS;

export const getStudentById = (id) => {
  return studentsData.find(s => s.id === id || s.userId === id);
};

export const getStudentsByDepartment = (dept) => {
  if (!dept) return studentsData;
  return studentsData.filter(s => s.department.toLowerCase().includes(dept.toLowerCase()));
};

export default studentsData;
