import React, { useEffect } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import useStudentAttendance from '../services/utils/api/useStudentAttendance';

const Home: React.FC = () => {
  const {
    studentAttendanceData,
    className,
    section,
    today,
    fetchAllStudentAttendance,
  } = useStudentAttendance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and log student attendance data for the current class
        console.log('Student Attendance Data:', studentAttendanceData);

        // Fetch and log all student attendance data
        const allStudentAttendanceData = await fetchAllStudentAttendance();
        console.log('All Student Attendance Data:', allStudentAttendanceData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentAttendanceData, fetchAllStudentAttendance]);

  return (
    <Box h="100%">
      <Text>Home Screen</Text>
      <Text>Class: {className}</Text>
      <Text>Section: {section}</Text>
      <Text>Date: {today}</Text>
    </Box>
  );
};

export default Home;