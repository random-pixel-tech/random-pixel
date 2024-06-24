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

const useStudentAttendance = (date: string) => {
  const [studentAttendanceData, setStudentAttendanceData] = useState<StudentAttendanceData[]>([]);
  const [className, setClassName] = useState<string>("");
  const [section, setSection] = useState<string>("");
  useEffect(() => {
    const fetchStudentAttendance = async (date: string) => {
      try {
        // Hardcoded teacherId for now
        const teacherId = 16;

        // Fetch class data for the given teacher
        const { data: classData, error: classError } = await supabase
          .from("classes")
          .select("id, class_name, section")
          .eq("teacher_id", teacherId)
          .single();

        if (classError) {
          console.error("Error fetching class:", classError);
          return;
        }

        // Fetch class name and section
        if (classData) {
          setClassName(classData.class_name);
          setSection(classData.section);
        }

        // Fetch students data for the class in ascending order of roll_number
        const { data: studentsData, error: studentsError } = await supabase
          .from("students")
          .select("*")
          .eq("class_id", classData.id)
          .order("roll_number", { ascending: true });

        if (studentsError) {
          console.error("Error fetching students:", studentsError);
          return;
        }

        // Fetch attendance records for the class and current date
        const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
          .from("attendance_records")
          .select("*")
          .eq("class_id", classData.id)
          .eq("date", date);

        if (attendanceRecordsError) {
          console.error("Error fetching attendance records:", attendanceRecordsError);
          return;
        }

        // Combine student data and attendance records
        const studentAttendanceData: StudentAttendanceData[] = studentsData.map((student) => {
          const existingRecord = attendanceRecordsData.find(
            (record) => record.scholar_id === student.scholar_id
          );

          return { student, attendanceRecord: existingRecord || null };
        });
        setStudentAttendanceData(studentAttendanceData);
      } catch (error) {
        console.error("Error fetching student attendance data:", error);
      }
    };

    fetchStudentAttendance(date);
  }, [date]);

  const updateAttendanceRecord = async (
    scholarId: string,
    session: AttendanceSession,
    status: AttendanceStatus,
    date: string
  ) => {
    try {
      const existingRecord = studentAttendanceData.find(
        (item) => item.student.scholar_id === scholarId
      )?.attendanceRecord;

      if (existingRecord) {
        // Update existing attendance record
        const { error } = await supabase
          .from("attendance_records")
          .update({
            [session + "_status"]: status,
            [session + "_attendance_taken_at"]: new Date().toISOString(),
          })
          .eq("id", existingRecord.id);

        if (error) {
          console.error("Error updating attendance record:", error);
          throw error;
        }
      } else {
        // Create a new attendance record
        const { error } = await supabase.from("attendance_records").insert({
          scholar_id: scholarId,
          class_id: studentAttendanceData.find((item) => item.student.scholar_id === scholarId)
            ?.student.class_id,
          date: date,
          [session + "_status"]: status,
          [session + "_attendance_taken_at"]: new Date().toISOString(),
        });

        if (error) {
          console.error("Error creating attendance record:", error);
          throw error;
        }
      }
    } catch (error) {
      console.error("Error updating attendance record:", error);
      throw error;
    }
  };

  const fetchUpdatedAttendanceData = async () => {
    try {
      const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
        .from("attendance_records")
        .select("*")
        .eq("date", date);

      if (attendanceRecordsError) {
        console.error("Error fetching updated attendance records:", attendanceRecordsError);
        return studentAttendanceData;
      }

      const updatedStudentAttendanceData: StudentAttendanceData[] = studentAttendanceData.map(
        (item) => {
          const updatedRecord = attendanceRecordsData.find(
            (record) => record.scholar_id === item.student.scholar_id
          );

          return { student: item.student, attendanceRecord: updatedRecord || null };
        }
      );

      return updatedStudentAttendanceData;
    } catch (error) {
      console.error("Error fetching updated attendance data:", error);
      return studentAttendanceData;
    }
  };

  const fetchAllStudentAttendance = async (date: string): Promise<AllStudentAttendanceData[]> => {
    try {
      // Fetch classes data
      const { data: classesData, error: classesError } = await supabase
        .from("classes")
        .select("*")
        .order("class_name", { ascending: true, nullsFirst: true });

      if (classesError) {
        console.error("Error fetching classes:", classesError);
        return [];
      }

      const allStudentAttendanceData: AllStudentAttendanceData[] = [];

      // Loop through each class
      for (const classData of classesData) {
        const classNumber = Number(classData.class_name.replace(/\D/g, ""));

        // Fetch students data for the current class in ascending order of roll_number
        const { data: studentsData, error: studentsError } = await supabase
          .from("students")
          .select("*")
          .eq("class_id", classData.id)
          .order("roll_number", { ascending: true });

        if (studentsError) {
          console.error("Error fetching students:", studentsError);
          return [];
        }

        // Fetch attendance records for the current class and current date
        const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
          .from("attendance_records")
          .select("*")
          .eq("class_id", classData.id)
          .eq("date", date);

        if (attendanceRecordsError) {
          console.error("Error fetching attendance records:", attendanceRecordsError);
          return [];
        }

        // Combine student data, attendance records, class, and section
        const classStudentAttendanceData: AllStudentAttendanceData[] = studentsData.map(
          (student) => {
            const existingRecord = attendanceRecordsData.find(
              (record) => record.scholar_id === student.scholar_id
            );

            return {
              student,
              attendanceRecord: existingRecord || null,
              class_name: classData.class_name,
              section: classData.section,
            };
          }
        );

        // Add classStudentAttendanceData to the allStudentAttendanceData array
        allStudentAttendanceData.push(...classStudentAttendanceData);
      }

      // Sort the allStudentAttendanceData array by the extracted class number
      allStudentAttendanceData.sort((a, b) => {
        const aClassNumber = Number(a.class_name.replace(/\D/g, ""));
        const bClassNumber = Number(b.class_name.replace(/\D/g, ""));
        return aClassNumber - bClassNumber;
      });

      return allStudentAttendanceData;
    } catch (error) {
      console.error("Error fetching all student attendance data:", error);
      return [];
    }
  };

  return {
    studentAttendanceData,
    updateAttendanceRecord,
    setStudentAttendanceData,
    fetchUpdatedAttendanceData,
    className,
    section,
    fetchAllStudentAttendance,
  };
};

export default useStudentAttendance;