import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { AttendanceStatus, AttendanceSession } from '../enums';

export interface Student {
  id: number;
  school_name: string;
  student_name: string;
  class_id: number;
  roll_number: number;
  class_name: string;
  section: string;
  scholar_id: string;
  tenant_id: string;
}

export interface AttendanceRecord {
  id: number;
  scholar_id: string;
  class_id: number;
  date: string;
  morning_status: AttendanceStatus;
  afternoon_status: AttendanceStatus;
  morning_comment: string | null;
  afternoon_comment: string | null;
  morning_attendance_taken_at: string | null;
  afternoon_attendance_taken_at: string | null;
  created_at: string;
  updated_at: string;
  school_name: string;
  tenant_id: string;
  [key: string]: AttendanceStatus | string | number | null;
}

export interface StudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
}

export interface AllStudentAttendanceData {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  class_name: string;
  section: string;
}

export type TeacherId = number;

const useStudentAttendance = () => {
  const [studentAttendanceData, setStudentAttendanceData] = useState<StudentAttendanceData[]>([]);
  const [className, setClassName] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [isHoliday, setIsHoliday] = useState<boolean>(false);

  // Define constants
  const today: string = new Date().toISOString().split('T')[0];

  // Fetch school data
  const fetchSchoolData = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.from('school_info').select('school_name').single();
      if (error) throw error;
      return data?.school_name ?? null;
    } catch (error) {
      console.error('Error fetching school data:', error);
      return null;
    }
  };

  // Fetch holiday data
  const fetchHolidayData = async (schoolName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('holidays')
        .select('*')
        .eq('school_name', schoolName)
        .gte('start_date', today)
        .lte('end_date', today)
        .limit(1);
      if (error) throw error;
      return data?.length > 0 ?? false;
    } catch (error) {
      console.error('Error fetching holiday data:', error);
      return false;
    }
  };

  // Fetch class data
  const fetchClassData = async (teacherId: TeacherId): Promise<number | null> => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('id, class_name, section')
        .eq('teacher_id', teacherId)
        .single();
      if (error) throw error;
      if (data) {
        setClassName(data.class_name);
        setSection(data.section);
        return data.id;
      }
      return null;
    } catch (error) {
      console.error('Error fetching class data:', error);
      return null;
    }
  };

  // Fetch students data
  const fetchStudentsData = async (classId: number): Promise<Student[]> => {
    try {
      const { data, error } = await supabase.from('students').select('*').eq('class_id', classId).order('roll_number');
      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error('Error fetching students data:', error);
      return [];
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async (classId: number): Promise<AttendanceRecord[]> => {
    try {
      const { data, error } = await supabase.from('attendance_records').select('*').eq('class_id', classId).eq('date', today);
      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      return [];
    }
  };

  // Fetch updated attendance data
  const fetchUpdatedAttendanceData = async (): Promise<StudentAttendanceData[]> => {
    try {
      const { data, error } = await supabase.from('attendance_records').select('*').eq('date', today);
      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error('Error fetching updated attendance data:', error);
      return studentAttendanceData;
    }
  };

  // Fetch all student attendance
  const fetchAllStudentAttendance = async (): Promise<AllStudentAttendanceData[]> => {
    try {
      // Fetch classes data
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .order('class_name', { ascending: true, nullsFirst: true });
      if (classesError) throw classesError;

      const allStudentAttendanceData: AllStudentAttendanceData[] = [];

      // Loop through each class
      for (const classData of classesData) {
        // Fetch students data
        const studentsData = await fetchStudentsData(classData.id);

        // Fetch attendance records
        const attendanceRecordsData = await fetchAttendanceRecords(classData.id);

        // Combine student data, attendance records, class, and section
        const classStudentAttendanceData = studentsData.map((student) => {
          const existingRecord = attendanceRecordsData.find((record) => record.scholar_id === student.scholar_id);
          return {
            student,
            attendanceRecord: existingRecord || null,
            class_name: classData.class_name,
            section: classData.section,
          };
        });

        // Add classStudentAttendanceData to the allStudentAttendanceData array
        allStudentAttendanceData.push(...classStudentAttendanceData);
      }

      // Sort the allStudentAttendanceData array by the extracted class number
      allStudentAttendanceData.sort((a, b) => {
        const aClassNumber = Number(a.class_name.replace(/\D/g, ''));
        const bClassNumber = Number(b.class_name.replace(/\D/g, ''));
        return aClassNumber - bClassNumber;
      });

      return allStudentAttendanceData;
    } catch (error) {
      console.error('Error fetching all student attendance data:', error);
      return [];
    }
  };

  // Effect to check holiday
  useEffect(() => {
    const fetchData = async () => {
      const schoolName = await fetchSchoolData();
      if (schoolName) {
        const isHoliday = await fetchHolidayData(schoolName);
        setIsHoliday(isHoliday);
      }
    };
    fetchData();
  }, []);

  return {
    studentAttendanceData,
    setStudentAttendanceData,
    updateAttendanceRecord: async (scholarId: string, session: AttendanceSession, status: AttendanceStatus) => {
      try {
        const existingRecord = studentAttendanceData.find((item) => item.student.scholar_id === scholarId)?.attendanceRecord;
        const recordId = existingRecord ? existingRecord.id : null;
        const fieldsToUpdate = {
          [`${session}_status`]: status,
          [`${session}_attendance_taken_at`]: new Date().toISOString(),
        };
        const { error } = await supabase.from('attendance_records').upsert({ id: recordId, scholar_id: scholarId, class_id: existingRecord?.class_id, date: today, ...fieldsToUpdate });
        if (error) throw error;
      } catch (error) {
        console.error('Error updating attendance record:', error);
        throw error;
      }
    },
    fetchUpdatedAttendanceData,
    className,
    section,
    today,
    fetchAllStudentAttendance,
    isHoliday,
  };
};

export default useStudentAttendance;
