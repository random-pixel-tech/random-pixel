import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import StudentAttendanceCard from './StudentAttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';
import ClassAttendanceCard from './ClassAttendanceCard';
import { ClassData } from '../services/utils/api/useAttendanceStats';
import { SelectedDuration } from '../services/utils/enums';

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

type AttendanceData = StudentAttendanceDataWithPercentage | ClassData;

interface AttendanceViewProps {
  selectedDuration: SelectedDuration;
  startDate: string;
  endDate: string;
  attendanceData: AttendanceData[];
  isLoading: boolean;
  selectedButton: 'left' | 'right';
  classData: ClassData[];
  onScroll: (position: number) => void;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedDuration,
  startDate,
  endDate,
  attendanceData,
  isLoading,
  selectedButton,
  classData,
  onScroll,
}) => {
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        const { contentOffset } = nativeEvent;
        onScroll(contentOffset.y);
      }}
      scrollEventThrottle={16}
    >
      <Box p="$4">
        {isLoading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          <AttendanceDataRenderer
            attendanceData={attendanceData}
            selectedDuration={selectedDuration}
            startDate={startDate}
            endDate={endDate}
            selectedButton={selectedButton}
            classData={classData}
          />
        )}
      </Box>
    </ScrollView>
  );
};

interface AttendanceDataRendererProps {
  attendanceData: AttendanceData[];
  selectedDuration: SelectedDuration;
  startDate: string;
  endDate: string;
  selectedButton: 'left' | 'right';
  classData: ClassData[];
}

const AttendanceDataRenderer: React.FC<AttendanceDataRendererProps> = ({
  attendanceData,
  selectedDuration,
  startDate,
  endDate,
  selectedButton,
}) => {
  return (
    <>
      {attendanceData.map((data) => {
        if (selectedButton === 'left' && 'classId' in data) {
          return <ClassAttendanceCard key={data.classId} classData={data} />;
        } else if (selectedButton === 'right' && 'student' in data && 'totalAttendance' in data && 'presentAttendance' in data) {
          return (
            <StudentAttendanceCard
              key={data.student.id}
              studentAttendanceData={data}
              className={data.className}
              section={data.section}
              selectedDuration={selectedDuration}
              totalAttendance={data.totalAttendance}
              presentAttendance={data.presentAttendance}
              morningStatus={data.attendanceRecord?.morningStatus}
              afternoonStatus={data.attendanceRecord?.afternoonStatus}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default AttendanceView;