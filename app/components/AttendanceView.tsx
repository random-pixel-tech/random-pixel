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

  // Calculate attendance percentage for each student
  const attendanceDataWithPercentage = useMemo(() => {
    return Promise.all(
      allStudentAttendanceData.map(async (data) => {
        const { totalAttendance, presentAttendance } = await fetchAttendanceByTime(
          data.student.id,
          startDate,
          endDate
        );
        const attendancePercentage = totalAttendance === 0 ? 0 : (presentAttendance / totalAttendance) * 100;
        return { ...data, attendancePercentage };
      })
    );
  }, [allStudentAttendanceData, fetchAttendanceByTime, startDate, endDate]);

  // Sort attendance data based on the selected sort option
  const sortedAttendanceData = useMemo(async () => {
    const attendanceData = await attendanceDataWithPercentage;

    if (sortOption === 'Name: A to Z') {
      return [...attendanceData].sort((a, b) => a.student.name.localeCompare(b.student.name));
    } else if (sortOption === 'Name: Z to A') {
      return [...attendanceData].sort((a, b) => b.student.name.localeCompare(a.student.name));
    } else if (sortOption === 'Attendance: Low to High') {
      return [...attendanceData].sort((a, b) => a.attendancePercentage - b.attendancePercentage);
    } else if (sortOption === 'Attendance: High to Low') {
      return [...attendanceData].sort((a, b) => b.attendancePercentage - a.attendancePercentage);
    }
    return attendanceData;
  }, [attendanceDataWithPercentage, sortOption]);

  return (
    <ScrollView>
      <Box p="$4">
        {isLoading ? (
          <Box><Text>Loading...</Text></Box>
        ) : (
          <AttendanceDataRenderer
            sortedAttendanceData={sortedAttendanceData}
            fetchAttendanceByTime={fetchAttendanceByTime}
            selectedOption={selectedOption}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </Box>
    </ScrollView>
  );
};

interface AttendanceDataRendererProps {
  sortedAttendanceData: Promise<AllStudentAttendanceData[]>;
  fetchAttendanceByTime: (
    studentId: string,
    startDate: string,
    endDate: string
  ) => Promise<{ totalAttendance: number; presentAttendance: number; }>;
  selectedOption: string;
  startDate: string;
  endDate: string;
}

const AttendanceDataRenderer: React.FC<AttendanceDataRendererProps> = ({
  sortedAttendanceData,
  fetchAttendanceByTime,
  selectedOption,
  startDate,
  endDate,
}) => {
  const [attendanceData, setAttendanceData] = useState<AllStudentAttendanceData[]>([]);

  useEffect(() => {
    const fetchSortedData = async () => {
      const data = await sortedAttendanceData;
      setAttendanceData(data);
    };

    fetchSortedData();
  }, [sortedAttendanceData]);

  return (
    <>
      {attendanceData.map((data) => (
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
      ))}
    </>
  );
};

export default AttendanceView;