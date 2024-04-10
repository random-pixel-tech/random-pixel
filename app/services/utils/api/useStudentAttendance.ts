import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { AttendanceStatus, AttendanceSession } from '../enums';

export interface Student {
  id: string;
  name: string;
  studentId: string;
  classId: string;
  rollNumber: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: number;
  studentId: string;
  classId: string;
  date: string;
  morningStatus: AttendanceStatus;
  afternoonStatus: AttendanceStatus;
  morningComment: string | null;
  afternoonComment: string | null;
  morningAttendanceTakenAt: string | null;
  afternoonAttendanceTakenAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Interface for combining student data and attendance record
interface StudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
}

export type TeacherId = string;

const useStudentAttendance = () => {
  const [studentAttendanceData, setStudentAttendanceData] = useState<StudentAttendanceData[]>([]);
  const [className, setClassName] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        // Hardcoded teacherId for now
        const teacherId = "8d8625d0-d5b1-46e3-aacd-697b286a851d";

        // Fetch class data for the given teacher
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('id, name')
          .eq('teacherId', teacherId)
          .single();

        if (classError) {
          console.error('Error fetching class:', classError);
          return;
        }

        // Fetch class name
        if (classData) {
          setClassName(classData.name);
        }

        // Fetch students data for the class
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .eq('classId', classData.id);

        if (studentsError) {
          console.error('Error fetching students:', studentsError);
          return;
        }

        // // Get the current date
        // const today = new Date().toISOString().split('T')[0];

        // Fetch attendance records for the class and current date
        const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('classId', classData.id)
          .eq('date', today);

        if (attendanceRecordsError) {
          console.error('Error fetching attendance records:', attendanceRecordsError);
          return;
        }

        // Combine student data and attendance records
        const studentAttendanceData: StudentAttendanceData[] = studentsData.map((student) => {
          const existingRecord = attendanceRecordsData.find(
            (record) => record.studentId === student.id
          );

          return { student, attendanceRecord: existingRecord || null };
        });
        setStudentAttendanceData(studentAttendanceData);
      } catch (error) {
        console.error('Error fetching student attendance data:', error);
      }
    };

    fetchStudentAttendance();
  }, []);

  // Function for updating attendance record
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
        // Update existing attendance record
        const { error } = await supabase
          .from('attendance_records')
          .update({
            [session + 'Status']: status,
            [session + 'AttendanceTakenAt']: new Date().toISOString(),
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
            studentId: studentId,
            classId: studentAttendanceData.find((item) => item.student.id === studentId)?.student.classId,
            date: today,
            [session + 'Status']: status,
            [session + 'AttendanceTakenAt']: new Date().toISOString(),
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

  // Function for fetching updated attendance data
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

      const updatedStudentAttendanceData: StudentAttendanceData[] = studentAttendanceData.map((item) => {
        const updatedRecord = attendanceRecordsData.find(
          (record) => record.studentId === item.student.id
        );

        return { student: item.student, attendanceRecord: updatedRecord || null };
      });

      return updatedStudentAttendanceData;
    } catch (error) {
      console.error('Error fetching updated attendance data:', error);
      return studentAttendanceData;
    }
  };

  return { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData, className, today };
};

export default useStudentAttendance;