import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import StudentAttendanceCard from './StudentAttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';
import ClassAttendanceCard from './ClassAttendanceCard';
import { ClassData } from '../services/utils/api/useAttendanceStats';
import { SelectedDuration } from '../services/utils/enums';
import HolidayMessage from './HolidayMessage';

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
  isHoliday: boolean;
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
  isHoliday
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
            isHoliday={isHoliday}
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
  isHoliday: boolean;
}

const AttendanceDataRenderer: React.FC<AttendanceDataRendererProps> = ({
  attendanceData,
  selectedDuration,
  startDate,
  endDate,
  selectedButton,
  isHoliday
}) => {
  if (selectedDuration === SelectedDuration.Daily && isHoliday) {
    return <HolidayMessage />;
  }

  return (
    <>
      {attendanceData.map((data) => {
        if (selectedButton === 'left' && 'classId' in data) {
          return <ClassAttendanceCard key={data.classId} classData={data} />;
        } else if (
          selectedButton === 'right' &&
          'student' in data &&
          'totalAttendance' in data &&
          'presentAttendance' in data
        ) {
          return (
            <StudentAttendanceCard
              key={data.student.scholar_id}
              studentAttendanceData={data}
              className={data.class_name}
              section={data.section}
              selectedDuration={selectedDuration}
              totalAttendance={data.totalAttendance}
              presentAttendance={data.presentAttendance}
              morningStatus={data.attendanceRecord?.morning_status}
              afternoonStatus={data.attendanceRecord?.afternoon_status}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default AttendanceView;