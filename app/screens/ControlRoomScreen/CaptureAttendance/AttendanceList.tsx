import React, { useCallback, useContext } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import AttendanceListHeader from "./AttendanceListHeader";
import AttendanceListItem from "./AttendanceListItem";
import HolidayMessage from "../../../components/HolidayMessage";
import { CaptureAttendanceContext } from "../../../services/utils/api/useAttendanceLogic";
import { AttendanceStatus } from "../../../services/utils/enums";

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
          onAttendanceStatusChange={(status) => handleAttendanceStatusChangeCb(studentId, status)}
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
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader
        FirstColumnText="R.N."
        SecondColumnText="Name"
        ThirdColumnText="P"
        FourthColumnText="A"
      />
      <Box flex={1}>
        <FlatList
          data={studentAttendanceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.student.scholar_id}
        />
      </Box>
    </Box>
  );
};

export default React.memo(AttendanceList);
