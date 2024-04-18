import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import useStudentAttendance, { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface AttendanceViewProps {
  selectedOption: string;
  startDate: string;
  endDate: string;
  fetchAttendanceByTime: (
    studentId: string,
    startDate: string,
    endDate: string
  ) => Promise<{ totalAttendance: number; presentAttendance: number; }>;
  sortOption: string;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedOption,
  startDate,
  endDate,
  fetchAttendanceByTime,
  sortOption,
}) => {
  const [allStudentAttendanceData, setAllStudentAttendanceData] = useState<AllStudentAttendanceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchAllStudentAttendance } = useStudentAttendance();

  // Memoize fetchAllStudentAttendance to prevent unnecessary re-renders
  const memoizedFetchAllStudentAttendance = useMemo(() => fetchAllStudentAttendance, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await memoizedFetchAllStudentAttendance();
        setAllStudentAttendanceData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memoizedFetchAllStudentAttendance]);

  // Sort attendance data based on the selected sort option
  const sortedAttendanceData = useMemo(() => {
    if (sortOption === 'Name: A to Z') {
      return [...allStudentAttendanceData].sort((a, b) => a.student.name.localeCompare(b.student.name));
    } else if (sortOption === 'Name: Z to A') {
      return [...allStudentAttendanceData].sort((a, b) => b.student.name.localeCompare(a.student.name));
    }
    return allStudentAttendanceData;
  }, [allStudentAttendanceData, sortOption]);

  return (
    <ScrollView>
      <Box p="$4">
        {isLoading ? (
          <Box><Text>Loading...</Text></Box>
        ) : (
          sortedAttendanceData.map((data) => (
            <AttendanceCard
              key={data.student.id}
              studentAttendanceData={data}
              className={data.className}
              section={data.section}
              fetchAttendanceByTime={fetchAttendanceByTime}
              selectedOption={selectedOption}
              startDate={startDate}
              endDate={endDate}
            />
          ))
        )}
      </Box>
    </ScrollView>
  );
};

export default AttendanceView;