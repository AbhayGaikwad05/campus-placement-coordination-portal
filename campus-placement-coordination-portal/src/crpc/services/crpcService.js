/**
 * CRPC Domain Services
 * Business logic for institutional placement management and approvals.
 */
export const crpcService = {
  calculateDepartmentStatistics(students, applications) {
    const total = students.length;
    const placed = students.filter(s => s.placementStatus === 'PLACED').length;
    const rate = total > 0 ? ((placed / total) * 100).toFixed(1) : '0';
    return { total, placed, rate };
  },

  filterScopedStudents(students, designation, userDepartment) {
    if (designation === 'Department Coordinator' && userDepartment) {
      return students.filter(s => s.department === userDepartment);
    }
    return students;
  }
};

export default crpcService;
