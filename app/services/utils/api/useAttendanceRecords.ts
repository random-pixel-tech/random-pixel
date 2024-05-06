import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { AttendanceRecord } from './useStudentAttendance';

export const useAttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const fetchAttendanceRecordsByClassName = async (className: string) => {
    try {
      // Fetch the class ID based on the class name
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('id')
        .eq('class_name', className)
        .single();

      if (classError) {
        throw classError;
      }

      if (!classData) {
        throw new Error(`Class "${className}" not found`);
      }

      const classId = classData.id;

      // Fetch attendance records for the class ID
      const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('class_id', classId);

      if (attendanceRecordsError) {
        throw attendanceRecordsError;
      }

      setAttendanceRecords(attendanceRecordsData);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
    // Add any necessary side effects here
  }, [attendanceRecords]);

  return {
    attendanceRecords,
    fetchAttendanceRecordsByClassName,
  };
};

export const fetchAttendanceRecordsByStudentName = async (studentName: string) => {
  try {
    // Fetch the student ID based on the student name
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('scholar_id')
      .eq('student_name', studentName)
      .single();

    if (studentError) {
      throw studentError;
    }

    if (!studentData) {
      throw new Error(`Student "${studentName}" not found`);
    }

    const scholarId = studentData.scholar_id;

    // Fetch attendance records for the student ID
    const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
      .from('attendance_records')
      .select('*')
      .eq('scholar_id', scholarId);

    if (attendanceRecordsError) {
      throw attendanceRecordsError;
    }

    return attendanceRecordsData;
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error;
  }
};