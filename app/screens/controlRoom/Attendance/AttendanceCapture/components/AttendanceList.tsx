import React, { useCallback, useContext } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import AttendanceListHeader from "./AttendanceListHeader";
import AttendanceListItem from "./AttendanceListItem";
import HolidayMessage from "../../AttendanceStats/components/HolidayMessage";
import { CaptureAttendanceContext } from "../../../../../services/utils/api/useAttendanceLogic";
import { AttendanceStatus } from "../../../../../services/utils/enums";
import { StyleSheet, View } from "react-native";

const AttendanceList = () => {
  const {
    isPopoverOpen,
    handlePopoverOpen: onPopoverOpen,
    handlePopoverClose: onPopoverClose,
    attendanceStatus,
    handleAttendanceStatusChange: onAttendanceStatusChange,
    handleLeaveClick: onLeaveClick,
    studentAttendanceData,
  } = useContext(CaptureAttendanceContext) || {};

  const handlePopoverOpenCb = useCallback(
    (studentId) => {
      onPopoverOpen(studentId);
    },

    [onPopoverOpen]
  );

  const handlePopoverCloseCb = useCallback(
    (studentId) => {
      onPopoverClose(studentId);
    },
    [onPopoverClose]
  );

  const handleAttendanceStatusChangeCb = useCallback(
    (studentId, status: AttendanceStatus | null) => {
      onAttendanceStatusChange(studentId, status);
    },
    [onAttendanceStatusChange]
  );

  const handleLeaveClickCb = useCallback(
    (studentId) => {
      onLeaveClick(studentId);
    },
    [onLeaveClick]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const studentId = item.student.scholar_id;

      return (
        <AttendanceListItem
          key={studentId}
          student={item.student}
          isPopoverOpen={isPopoverOpen[studentId]}
          onPopoverOpen={() => handlePopoverOpenCb(studentId)}
          onPopoverClose={() => handlePopoverCloseCb(studentId)}
          attendanceStatus={attendanceStatus[studentId] || null}
          onAttendanceStatusChange={(status) =>
            handleAttendanceStatusChangeCb(studentId, status)
          }
          onLeaveClick={() => handleLeaveClickCb(studentId)}
        />
      );
    },
    [
      isPopoverOpen,
      handlePopoverOpenCb,
      handlePopoverCloseCb,
      attendanceStatus,
      handleAttendanceStatusChangeCb,
      handleLeaveClickCb,
    ]
  );

  return (
    <View style={styles.container}>
      <AttendanceListHeader
        FirstColumnText="R.N."
        SecondColumnText="Name"
        ThirdColumnText="P"
        FourthColumnText="A"
      />
      <View style={styles.listContainer}>
        <FlatList
          data={studentAttendanceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.student.scholar_id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
  },
});

export default React.memo(AttendanceList);
