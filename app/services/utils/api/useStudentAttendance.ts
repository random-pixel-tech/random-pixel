// useStudentAttendance.ts

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export interface Student {
  id: string;
  name: string;
  student_id: string;
  class_id: string;
  roll_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  id: number;
  student_id: string;
  class_id: string;
  date: string;
  morning_status: AttendanceStatus;
  afternoon_status: AttendanceStatus;
  morning_comment: string | null;
  afternoon_comment: string | null;
  morning_attendance_taken_at: string | null;
  afternoon_attendance_taken_at: string | null;
  created_at: string;
  updated_at: string;
}

export enum AttendanceStatus {
  Present = 'present',
  Absent = 'absent',
  Leave = 'leave',
}

export enum AttendanceSession {
  Morning = 'morning',
  Afternoon = 'afternoon',
}

interface StudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
}

const useStudentAttendance = () => {
  const [studentAttendanceData, setStudentAttendanceData] = useState<StudentAttendanceData[]>([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState<Record<string, AttendanceStatus | null>>({});

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*');

        if (studentsError) {
          console.error('Error fetching students:', studentsError);
        } else {
          console.log('Students Data:', studentsData);

          const today = new Date().toISOString().split('T')[0];

          const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
            .from('attendance_records')
            .select('*')
            .eq('date', today);

          if (attendanceRecordsError) {
            console.error('Error fetching attendance records:', attendanceRecordsError);
          } else {
            console.log('Attendance Records Data:', attendanceRecordsData);

            const studentAttendanceData: StudentAttendanceData[] = studentsData.map((student) => {
              const existingRecord = attendanceRecordsData.find(
                (record) => record.student_id === student.id
              );

              return { student, attendanceRecord: existingRecord || null };
            });
            setStudentAttendanceData(studentAttendanceData);
          }
        }
      } catch (error) {
        console.error('Error fetching student attendance data:', error);
      }
    };

    fetchStudentAttendance();
  }, []);

  // Update the attendance record for a student
const updateAttendanceRecord = async (
  studentId: string,
  session: AttendanceSession,
  status: AttendanceStatus
) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = studentAttendanceData.find(
      (item) => item.student.id === studentId
    )?.attendanceRecord;

    if (existingRecord) {
      // Update the existing attendance record
      const { error } = await supabase
        .from('attendance_records')
        .update({
          [session + '_status']: status,
          [session + '_attendance_taken_at']: new Date().toISOString(),
        })
        .eq('id', existingRecord.id);

      if (error) {
        console.error('Error updating attendance record:', error);
        throw error;
      }
    } else {
      // Create a new attendance record
      const { error } = await supabase
        .from('attendance_records')
        .insert({
          student_id: studentId,
          class_id: '7e95d5d0-b050-4a59-8dcb-21f2ff291554',
          date: today,
          [session + '_status']: status,
          [session + '_attendance_taken_at']: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating attendance record:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw error;
  }
};

// Fetch the updated attendance data
const fetchUpdatedAttendanceData = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
      .from('attendance_records')
      .select('*')
      .eq('date', today);

    if (attendanceRecordsError) {
      console.error('Error fetching updated attendance records:', attendanceRecordsError);
      return studentAttendanceData;
    }

    // Merge the updated attendance records with the student data
    const updatedStudentAttendanceData: StudentAttendanceData[] = studentAttendanceData.map((item) => {
      const updatedRecord = attendanceRecordsData.find(
        (record) => record.student_id === item.student.id
      );

      return { student: item.student, attendanceRecord: updatedRecord || null };
    });

    return updatedStudentAttendanceData;
  } catch (error) {
    console.error('Error fetching updated attendance data:', error);
    return studentAttendanceData;
  }
};

  return { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData };
};

export default useStudentAttendance;