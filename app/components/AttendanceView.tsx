import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

interface AttendanceViewProps {
  selectedOption: string;
  startDate: string;
  endDate: string;
  attendanceDataWithPercentage: StudentAttendanceDataWithPercentage[];
  isLoading: boolean;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedOption,
  startDate,
  endDate,
  attendanceDataWithPercentage,
  isLoading,
}) => {
  return (
    <ScrollView>
      <Box p="$4">
        {isLoading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          <AttendanceDataRenderer
            attendanceData={attendanceDataWithPercentage}
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
  attendanceData: StudentAttendanceDataWithPercentage[];
  selectedOption: string;
  startDate: string;
  endDate: string;
}

const AttendanceDataRenderer: React.FC<AttendanceDataRendererProps> = ({
  attendanceData,
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
          selectedOption={selectedOption}
          totalAttendance={data.totalAttendance}
          presentAttendance={data.presentAttendance}
        />
      ))}
    </>
  );
};

export default AttendanceView;