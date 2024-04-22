import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface AttendanceViewProps {
  selectedOption: string;
  startDate: string;
  endDate: string;
  fetchAttendanceByTime: (
    studentIds: string[],
    startDate: string,
    endDate: string
  ) => Promise<{ [studentId: string]: { totalAttendance: number; presentAttendance: number } }>;
  attendanceData: Promise<AllStudentAttendanceData[]>;
  isLoading: boolean;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedOption,
  startDate,
  endDate,
  fetchAttendanceByTime,
  attendanceData,
  isLoading,
}) => {
  const [data, setData] = useState<AllStudentAttendanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await attendanceData;
      setData(fetchedData);
    };

    fetchData();
  }, [attendanceData]);

  return (
    <ScrollView>
      <Box p="$4">
        {isLoading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          <AttendanceDataRenderer
            attendanceData={data}
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
  attendanceData: AllStudentAttendanceData[];
  fetchAttendanceByTime: (
    studentIds: string[],
    startDate: string,
    endDate: string
  ) => Promise<{ [studentId: string]: { totalAttendance: number; presentAttendance: number } }>;
  selectedOption: string;
  startDate: string;
  endDate: string;
}

const AttendanceDataRenderer: React.FC<AttendanceDataRendererProps> = ({
  attendanceData,
  fetchAttendanceByTime,
  selectedOption,
  startDate,
  endDate,
}) => {
  return (
    <>
      {attendanceData.map((data) => (
        <AttendanceCard
          key={data.student.id}
          studentAttendanceData={data}
          className={data.className}
          section={data.section}
          fetchAttendanceByTime={(studentIds, startDate, endDate) =>
            fetchAttendanceByTime([data.student.id], startDate, endDate)
          }
          selectedOption={selectedOption}
          startDate={startDate}
          endDate={endDate}
        />
      ))}
    </>
  );
};

export default AttendanceView;