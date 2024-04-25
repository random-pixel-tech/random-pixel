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
  [key: string]: AttendanceStatus | string | number | null;
}

// Interface for combining student data and attendance record
export interface StudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
}

// Create a new interface for the data fetched by fetchAllStudentAttendance
export interface AllStudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  className: string;
  section: string;
}


export type TeacherId = string;

const useStudentAttendance = () => {
  const [studentAttendanceData, setStudentAttendanceData] = useState<StudentAttendanceData[]>([]);
  const [className, setClassName] = useState<string>('');
  const [section, setSection] = useState<string>(''); // Add section state
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        // Hardcoded teacherId for now
        const teacherId = "ea69fefd-62cc-4c5d-8702-aaaa0a7cedfd";

        // Fetch class data for the given teacher
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('id, name, section') // Include section column
          .eq('teacherId', teacherId)
          .single();

        if (classError) {
          console.error('Error fetching class:', classError);
          return;
        }

        // Fetch class name and section
        if (classData) {
          setClassName(classData.name);
          setSection(classData.section); // Set section state
        }

        // Fetch students data for the class in ascending order of rollNumber
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .eq('classId', classData.id)
          .order('rollNumber', { ascending: true }); // Order by rollNumber in ascending order

        if (studentsError) {
          console.error('Error fetching students:', studentsError);
          return;
        }


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


  const fetchAllStudentAttendance = async (): Promise<AllStudentAttendanceData[]> => {
    try {
      // Fetch classes data
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .order('name', { ascending: true, nullsFirst: true }); // Order classes by name numerically
  
      if (classesError) {
        console.error('Error fetching classes:', classesError);
        return [];
      }
  
      const allStudentAttendanceData: AllStudentAttendanceData[] = [];
  
      // Loop through each class
      for (const classData of classesData) {
        const classNumber = Number(classData.name.replace(/\D/g, '')); // Extract the class number from the name
  
        // Fetch students data for the current class in ascending order of rollNumber
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .eq('classId', classData.id)
          .order('rollNumber', { ascending: true });
  
        if (studentsError) {
          console.error('Error fetching students:', studentsError);
          return [];
        }
  
        // Fetch attendance records for the current class and current date
        const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('classId', classData.id)
          .eq('date', today);
  
        if (attendanceRecordsError) {
          console.error('Error fetching attendance records:', attendanceRecordsError);
          return [];
        }
  
        // Combine student data, attendance records, class, and section
const classStudentAttendanceData: AllStudentAttendanceData[] = studentsData.map((student) => {
  const existingRecord = attendanceRecordsData.find(
    (record) => record.studentId === student.id
  );

  // Log the morningStatus and afternoonStatus for each student
  console.log(`Date: ${today}`);
  console.log(`Student: ${student.name}`);
  console.log(`Morning Status: ${existingRecord?.morningStatus || 'No record'}`);
  console.log(`Afternoon Status: ${existingRecord?.afternoonStatus || 'No record'}`);
  console.log('---');

  return {
    student,
    attendanceRecord: existingRecord || null,
    className: classData.name,
    section: classData.section,
  };
});
  
        // Add classStudentAttendanceData to the allStudentAttendanceData array
        allStudentAttendanceData.push(...classStudentAttendanceData);
      }
  
      // Sort the allStudentAttendanceData array by the extracted class number
      allStudentAttendanceData.sort((a, b) => {
        const aClassNumber = Number(a.className.replace(/\D/g, ''));
        const bClassNumber = Number(b.className.replace(/\D/g, ''));
        return aClassNumber - bClassNumber;
      });
  
      return allStudentAttendanceData;
    } catch (error) {
      console.error('Error fetching all student attendance data:', error);
      return [];
    }
  };

  return { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData, className, section, today, fetchAllStudentAttendance };
};

export default useStudentAttendance; 