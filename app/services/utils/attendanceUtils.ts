import { AttendanceStatus, AttendanceSession } from './enums';


interface StudentAttendanceData {
  student: { id: string };
  attendanceRecord: {
    morningStatus: AttendanceStatus;
    afternoonStatus: AttendanceStatus;
  } | null;
}

export const getInitialAttendanceState = (
  studentAttendanceData: StudentAttendanceData[],
  session: AttendanceSession
): Record<string, AttendanceStatus | null> => {
  const initialAttendanceState: Record<string, AttendanceStatus | null> = {};
  studentAttendanceData.forEach(({ student, attendanceRecord }) => {
    if (session === AttendanceSession.Morning) {
      initialAttendanceState[student.id] = attendanceRecord?.morningStatus || null;
    } else {
      initialAttendanceState[student.id] = attendanceRecord?.afternoonStatus || null;
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
    const selectedStatus = attendanceStatus[student.id];
    if (session === AttendanceSession.Morning) {
      return (
        (attendanceRecord && attendanceRecord.morningStatus !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    } else {
      return (
        (attendanceRecord && attendanceRecord.afternoonStatus !== selectedStatus) ||
        (!attendanceRecord && selectedStatus !== null)
      );
    }
  });
};