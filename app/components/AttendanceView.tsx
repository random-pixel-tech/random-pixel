import React from 'react';
import { Box, Text, FlatList } from '@gluestack-ui/themed';
import StudentAttendanceCard from './StudentAttendanceCard';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';
import ClassAttendanceCard from './ClassAttendanceCard';
import { ClassData } from '../services/utils/api/useAttendanceStats';
import { SelectedDuration, Segment } from '../services/utils/enums';
import HolidayMessage from './HolidayMessage';
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

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
  selectedSegment: Segment;
  classData: ClassData[];
  isHoliday: boolean;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({
  selectedDuration,
  startDate,
  endDate,
  attendanceData,
  isLoading,
  selectedSegment,
  classData,
  isHoliday,
  onScroll,
}) => {
  const renderAttendanceItem = (item: AttendanceData) => {
    if (selectedDuration === SelectedDuration.Daily && isHoliday) {
      return <HolidayMessage />;
    }
    if (selectedSegment === Segment.ClassSegment && "classId" in item) {
      return <ClassAttendanceCard classData={item} />;
    } else if (
      selectedSegment === Segment.StudentSegment &&
      "student" in item &&
      "totalAttendance" in item &&
      "presentAttendance" in item
    ) {
      return (
        <StudentAttendanceCard
          studentAttendanceData={item}
          className={item.class_name}
          section={item.section}
          selectedDuration={selectedDuration}
          totalAttendance={item.totalAttendance}
          presentAttendance={item.presentAttendance}
          morningStatus={item.attendanceRecord?.morning_status}
          afternoonStatus={item.attendanceRecord?.afternoon_status}
        />
      );
    }
    return null;
  };

  const keyExtractor = (item: unknown, index: number) => {
    const attendanceItem = item as AttendanceData;
    return "classId" in attendanceItem
      ? attendanceItem.classId.toString()
      : attendanceItem.student.scholar_id;
  };

  return (
    <FlatList
      data={attendanceData}
      renderItem={({ item }) => renderAttendanceItem(item as AttendanceData)}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        isLoading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : null
      }
      contentContainerStyle={{ padding: 16 }}
      scrollEventThrottle={16}
      onScroll={onScroll}
    />
  );
};

export default AttendanceView;