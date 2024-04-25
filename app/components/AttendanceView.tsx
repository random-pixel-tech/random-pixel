import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';
import ClassAttendanceCard from './ClassAttendanceCard';
import { ClassData } from '../services/utils/api/useAttendanceStats';
import { SelectedDuration } from '../services/utils/enums';

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

interface AttendanceViewProps {
  selectedDuration: SelectedDuration;
  startDate: string;
  endDate: string;
  attendanceDataWithPercentage: StudentAttendanceDataWithPercentage[];
  isLoading: boolean;
  selectedButton: 'left' | 'right';
  classData: ClassData[];
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedDuration,
  startDate,
  endDate,
  attendanceDataWithPercentage,
  isLoading,
  selectedButton,
  classData,
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
  attendanceData: StudentAttendanceDataWithPercentage[];
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
  classData,
}) => {
  return (
    <>
      {selectedButton === 'left' ? (
        classData.map((data) => (
          <ClassAttendanceCard key={data.classId} classData={data} />
        ))
      ) : (
        attendanceData.map((data) => (
          <AttendanceCard
            key={data.student.id}
            studentAttendanceData={data}
            className={data.className}
            section={data.section}
            selectedDuration={selectedDuration}
            totalAttendance={data.totalAttendance}
            presentAttendance={data.presentAttendance}
          />
        ))
      )}
    </>
  );
};

export default AttendanceView;