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
export const getInitialAttendanceState = (
    studentAttendanceData: StudentAttendanceData[]
  ): Record<string, AttendanceStatus | null> => {
    const initialAttendanceState: Record<string, AttendanceStatus | null> = {};
    studentAttendanceData.forEach(({ student, attendanceRecord }) => {
      initialAttendanceState[student.id] = attendanceRecord?.morningStatus || null;
    });
    return initialAttendanceState;
  };
  
  // Get the updated attendance records based on the selected checkboxes
  export const getUpdatedRecords = (
    studentAttendanceData: StudentAttendanceData[],
    attendanceStatus: Record<string, AttendanceStatus | null>
  ) => {
    return studentAttendanceData.filter(({ student, attendanceRecord }) => {
      const selectedStatus = attendanceStatus[student.id];
      return (
        (attendanceRecord && attendanceRecord.morningStatus !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    });
  };