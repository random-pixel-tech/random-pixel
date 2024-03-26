import React, { useState } from 'react';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { supabase } from '../utils/supabase';
import axios from 'axios';
import { supabaseUrl } from '../utils/supabase';

const Home: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudentsData = async () => {
    try {
      const { data: attendanceRecordsData, error: attendanceRecordsError } = await supabase
        .from('attendance_records')
        .select('student_id, morning_status, afternoon_status')
        .limit(10);

      if (attendanceRecordsError) {
        throw attendanceRecordsError;
      }

      if (attendanceRecordsData) {
        const studentIds = attendanceRecordsData.map((record: any) => record.student_id);
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('id, name')
          .in('id', studentIds);

        if (studentsError) {
          throw studentsError;
        }

        if (studentsData) {
          const mergedData = attendanceRecordsData.map((record: any) => {
            const matchingStudent = studentsData.find((student: any) => student.id === record.student_id);
            return {
              student_name: matchingStudent ? matchingStudent.name : 'Unknown',
              morning_status: record.morning_status,
              afternoon_status: record.afternoon_status,
            };
          });
          setStudents(mergedData);
          console.log('Students data:', mergedData);
        }
      }
    } catch (error: any) {
      console.error('Error fetching students data:', error.message);
    }
  };

  const updateAttendance = async (studentId: string, date: Date, morningStatus: string, afternoonStatus: string) => {
    try {
      const response = await axios.patch(
        `${supabaseUrl}/rest/v1/attendance_records?student_id=eq.${studentId}&date=eq.${date.toISOString()}`,
        { morning_status: morningStatus, afternoon_status: afternoonStatus }
      );

      console.log('Attendance updated successfully:', response.data);
      // You can add logic to update UI or handle the response as needed
    } catch (error: any) {
      console.error('Error updating attendance:', error.message);
      // Handle error, display error message, etc.
    }
  };

  const handleUpdateAttendance = async () => {
    // Example usage: Update attendance for a specific student and date
    const studentId = 'studentId123';
    const currentDate = new Date();
    const morningStatus = 'present';
    const afternoonStatus = 'absent';

    await updateAttendance(studentId, currentDate, morningStatus, afternoonStatus);
  };

  return (
    <Box h="100%">
      <Text>Home Screen</Text>
      <Button onPress={fetchStudentsData}>
        <ButtonText>Fetch Students Data</ButtonText>
      </Button>
      <Button onPress={handleUpdateAttendance}>
        <ButtonText>Update Attendance</ButtonText>
      </Button>
    </Box>
  );
};

export default Home;
