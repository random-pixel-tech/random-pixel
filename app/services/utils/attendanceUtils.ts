import { AttendanceStatus, AttendanceSession } from './enums';

interface StudentAttendanceData {
  student: {
    scholar_id: string;
  };
  attendanceRecord: {
    morning_status: AttendanceStatus;
    afternoon_status: AttendanceStatus;
  } | null;
}

export const getInitialAttendanceState = (
  studentAttendanceData: StudentAttendanceData[],
  session: AttendanceSession
): Record<string, AttendanceStatus | null> => {
  const initialAttendanceState: Record<string, AttendanceStatus | null> = {};
  studentAttendanceData.forEach(({ student, attendanceRecord }) => {
    if (session === AttendanceSession.Morning) {
      initialAttendanceState[student.scholar_id] = attendanceRecord?.morning_status || null;
    } else {
      initialAttendanceState[student.scholar_id] = attendanceRecord?.afternoon_status || null;
    }
  });
  return initialAttendanceState;
};

export const getUpdatedRecords = (
  studentAttendanceData: StudentAttendanceData[],
  attendanceStatus: Record<string, AttendanceStatus | null>,
  session: AttendanceSession
) => {
  return studentAttendanceData.filter(({ student, attendanceRecord }) => {
    const selectedStatus = attendanceStatus[student.scholar_id];
    if (session === AttendanceSession.Morning) {
      return (
        (attendanceRecord && attendanceRecord.morning_status !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    } else {
      return (
        (attendanceRecord && attendanceRecord.afternoon_status !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    }
  });
};