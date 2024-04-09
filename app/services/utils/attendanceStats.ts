import { useState, useEffect } from 'react';
import { fetchAttendanceRecordsByClassName } from './api/useAttendanceRecords';
import { AttendanceRecord } from './api/useStudentAttendance';

export const useAttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const fetchAttendanceRecords = async (className: string) => {
    try {
      const records = await fetchAttendanceRecordsByClassName(className);
      setAttendanceRecords(records);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
    console.log('Fetched attendance records:', attendanceRecords);
  }, [attendanceRecords]);

  return { attendanceRecords, fetchAttendanceRecords };
};

import { AttendanceStatus } from '../../services/utils/api/useStudentAttendance';

interface StudentAttendanceData {
  student: { id: string };
  attendanceRecord: { morningStatus: AttendanceStatus } | null;
}

// Function for getting the initial attendance state
export const getInitialAttendanceState = (studentAttendanceData: StudentAttendanceData[]): Record<string, AttendanceStatus | null> => {
  const initialAttendanceState: Record<string, AttendanceStatus | null> = {};
  studentAttendanceData.forEach(({ student, attendanceRecord }) => {
    initialAttendanceState[student.id] = attendanceRecord?.morningStatus || null;
  });
  return initialAttendanceState;
};

// Function for getting updated attendance records
export const getUpdatedRecords = (studentAttendanceData: StudentAttendanceData[], attendanceStatus: Record<string, AttendanceStatus | null>) => {
  return studentAttendanceData.filter(({ student, attendanceRecord }) => {
    const selectedStatus = attendanceStatus[student.id];
    return (
      (attendanceRecord && attendanceRecord.morningStatus !== selectedStatus) ||
      (!attendanceRecord && selectedStatus !== null)
    );
  });
};
