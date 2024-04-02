import { AttendanceStatus } from '../../services/utils/api/useStudentAttendance';

interface StudentAttendanceData {
  student: {
    id: string;
  };
  attendanceRecord: {
   morningStatus : AttendanceStatus;
  } | null;
}

// Get the initial state of the selected checkboxes based on the student attendance data
export const getInitialSelectedCheckbox = (
    studentAttendanceData: StudentAttendanceData[]
  ): Record<string, AttendanceStatus | null> => {
    const initialSelectedCheckbox: Record<string, AttendanceStatus | null> = {};
    studentAttendanceData.forEach(({ student, attendanceRecord }) => {
      initialSelectedCheckbox[student.id] = attendanceRecord?.morningStatus || null;
    });
    return initialSelectedCheckbox;
  };
  
  // Get the updated attendance records based on the selected checkboxes
  export const getUpdatedRecords = (
    studentAttendanceData: StudentAttendanceData[],
    selectedCheckbox: Record<string, AttendanceStatus | null>
  ) => {
    return studentAttendanceData.filter(({ student, attendanceRecord }) => {
      const selectedStatus = selectedCheckbox[student.id];
      return (
        (attendanceRecord && attendanceRecord.morningStatus !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    });
  };