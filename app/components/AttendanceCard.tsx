import React, { useEffect, useState, useCallback } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { StudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface AttendanceCardProps {
  studentAttendanceData: StudentAttendanceData;
  className: string;
  section: string;
  fetchAttendanceByTime: (
    studentId: string,
    startDate: string,
    endDate: string
  ) => Promise<{
    totalAttendance: number;
    presentAttendance: number;
  }>;
  selectedOption: string;
  startDate: string;
  endDate: string;
}

// Helper function to convert numbers to ordinal form
const toOrdinal = (n: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  studentAttendanceData,
  className,
  section,
  fetchAttendanceByTime,
  selectedOption,
  startDate,
  endDate,
}) => {
  const { student, attendanceRecord } = studentAttendanceData;
  const { name, rollNumber } = student;
  const [totalAttendance, setTotalAttendance] = useState<number>(0);
  const [presentAttendance, setPresentAttendance] = useState<number>(0);

  // Memoize fetchAttendanceByTime
  const memoizedFetchAttendanceByTime = useCallback(fetchAttendanceByTime, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { totalAttendance, presentAttendance } = await memoizedFetchAttendanceByTime(
          student.id,
          startDate,
          endDate
        );

        if (isMounted) {
          setTotalAttendance(totalAttendance);
          setPresentAttendance(presentAttendance);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    if (selectedOption && startDate && endDate && isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [memoizedFetchAttendanceByTime, student.id, selectedOption, startDate, endDate]);

  const percentage = totalAttendance === 0 ? 0 : (presentAttendance / totalAttendance) * 100;

  // Convert className to ordinal form
  const classNameOrdinal = toOrdinal(parseInt(className));

  return (
    <Box
      bg="#F8F8FF"
      p="$4"
      borderRadius="$md"
      mb="$4"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      borderColor="$pixPrimaryLight50"
      borderWidth={1}
    >
      <Box display="flex" flexDirection="column">
        <Text fontSize="$lg" fontWeight="$bold" mb="$2" color="$pixPrimaryDark50">
          {name}
        </Text>
        <Box display="flex" flexDirection="row" alignContent="center" mb="$2">
          <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
            Roll No:
          </Text>
          <Text fontSize="$sm" color="$pixPrimaryDark50">
            {rollNumber}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" alignContent="center">
          <Box display="flex" flexDirection="row" alignContent="center">
            <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
              Class:
            </Text>
            <Text fontSize="$sm" color="$pixPrimaryDark50" pr="$1">
              {classNameOrdinal}
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" alignContent="center">
            <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
              Section:
            </Text>
            <Text fontSize="$sm" color="$pixPrimaryDark50">
              {section}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box bg="#DFD6F8" px="$2" py="$0.5" rounded="$md" alignSelf="flex-end">
          <Text fontSize="$sm" color="$pixPrimaryDark50">
            #{presentAttendance}/{totalAttendance}
          </Text>
        </Box>

        <Box alignContent="center" display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" mr="$2">
            <Text fontSize="$md" color="$pixText100" alignSelf="center">
              {presentAttendance}/{totalAttendance}
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">
              Attendance
            </Text>
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontSize="$md" color="$pixText100" alignSelf="center">
              {percentage.toFixed(0)}%
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">
              Percentage
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceCard;