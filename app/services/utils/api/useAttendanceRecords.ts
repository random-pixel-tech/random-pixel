import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { AttendanceRecord } from './useStudentAttendance';

export const useAttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const fetchAttendanceRecordsByClassName = async (className: string) => {
    try {
      // Fetch the class ID based on the class name
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select("id")
        .eq("name", className);

      if (classError) {
        throw classError;
      }

      if (!classData) {
        throw new Error(`Class "${className}" not found`);
      }

      if (classData.length === 0) {
        throw new Error(`Class "${className}" not found`);
      }
      // fetch attendance record for each class
      if (classData.length > 0) {
        const attendanceRecords = [];
        classData.map(async (data) => {
          console.log("fetching: ", data.id);
          const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
            .from("attendance_records")
            .select("*")
            .eq("classId", data.id);

          if (attendanceRecordsError) {
            console.log("attendanceRecordsError: ", attendanceRecordsError);
            throw attendanceRecordsError;
          }
          console.log("attendanceRecords: ", attendanceRecordsData);
          attendanceRecords.push(attendanceRecordsData);
        });

        setAttendanceRecords(attendanceRecords);
      }

      // Fetch attendance records for the class ID
      // const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
      //   .from("attendance_records")
      //   .select("*")
      //   .eq("classId", classId);

      //   if (attendanceRecordsError) {
      //     throw attendanceRecordsError;
      //   }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
  }, [attendanceRecords]);

  return { attendanceRecords, fetchAttendanceRecordsByClassName };
};

export const fetchAttendanceRecordsByStudentName = async (studentName: string) => {
  try {
    // Fetch the student ID based on the student name
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('name', studentName)
      .single();

    if (studentError) {
      throw studentError;
    }

    if (!studentData) {
      throw new Error(`Student "${studentName}" not found`);
    }

    const studentId = studentData.id;

    // Fetch attendance records for the student ID
    const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
      .from('attendance_records')
      .select('*')
      .eq('studentId', studentId);

    if (attendanceRecordsError) {
      throw attendanceRecordsError;
    }

    return attendanceRecordsData;
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw error;
  }
};
