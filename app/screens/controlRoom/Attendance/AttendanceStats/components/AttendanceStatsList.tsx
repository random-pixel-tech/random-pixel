import React, { useCallback, useContext, useState } from "react";
import { Box, Text, FlatList } from "@gluestack-ui/themed";
import StudentAttendanceCard from "./StudentAttendanceCard";
import { AllStudentAttendanceData } from "../../../services/utils/api/useStudentAttendance";
import ClassAttendanceCard from "./ClassAttendanceCard";
import { ClassData } from "../../../services/utils/api/useAttendanceStats";
import {
  SelectedDuration,
  Segment,
} from "../../../services/utils/enums";
import HolidayMessage from "./HolidayMessage";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useDateAndTimeUtil } from "../../../services/utils/dateAndTimeUtils";
import { AttendanceStatsContext } from "../../../providers/attendanceStatsProvider";

interface StudentAttendanceDataWithPercentage
  extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

type AttendanceData = StudentAttendanceDataWithPercentage | ClassData;

interface AttendanceViewProps {
  showSearchBar: (show: boolean) => void;
}

const AttendanceStatsList: React.FC<AttendanceViewProps> = ({
  showSearchBar,
}) => {
  const {
    selectedDuration,
    selectedSegment,
    attendanceDataWithPercentage: attendanceData,
    isLoading,
  } = useContext(AttendanceStatsContext) ?? {};

  const [yOffset, setYOffset] = useState(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;

      setYOffset((prevOffset) => {
        if (currentOffset < 0) return 0;
        if (currentOffset > prevOffset) {
          showSearchBar(false);
        } else if (currentOffset <= prevOffset) {
          showSearchBar(true);
        }
        return currentOffset;
      });
    },
    []
  );

  const { isDayHoliday } = useDateAndTimeUtil();

  const renderAttendanceItem = useCallback(
    (item: AttendanceData) => {
      if (
        selectedSegment === Segment.ClassSegment &&
        "classId" in item
      ) {
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
    },
    [selectedSegment, selectedDuration]
  );

  const keyExtractor = (item: unknown, index: number) => {
    const attendanceItem = item as AttendanceData;
    return "classId" in attendanceItem
      ? attendanceItem.classId.toString()
      : attendanceItem.student.scholar_id;
  };

  if (selectedDuration === SelectedDuration.Daily && isDayHoliday) {
    return <HolidayMessage />;
  }

  return (
    <FlatList
      data={attendanceData}
      renderItem={({ item }) =>
        renderAttendanceItem(item as AttendanceData)
      }
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
      onScroll={handleScroll}
    />
  );
};

export default AttendanceStatsList;
