import { AttendanceStatus } from '../../services/utils/api/useStudentAttendance';

interface StudentAttendanceData {
  student: {
    id: string;
  };
  attendanceRecord: {
    morning_status: AttendanceStatus;
  } | null;
}

export const getInitialSelectedCheckbox = (
  studentAttendanceData: StudentAttendanceData[]
): Record<string, AttendanceStatus | null> => {
  const initialSelectedCheckbox: Record<string, AttendanceStatus | null> = {};
  studentAttendanceData.forEach(({ student, attendanceRecord }) => {
    initialSelectedCheckbox[student.id] = attendanceRecord?.morning_status || null;
  });
  return initialSelectedCheckbox;
};

export const getUpdatedRecords = (
  studentAttendanceData: StudentAttendanceData[],
  selectedCheckbox: Record<string, AttendanceStatus | null>
) => {
  return studentAttendanceData.filter(({ student, attendanceRecord }) => {
    const selectedStatus = selectedCheckbox[student.id];
    return (
      (attendanceRecord && attendanceRecord.morning_status !== selectedStatus) ||
      (!attendanceRecord && selectedStatus !== null)
    );
  });
};