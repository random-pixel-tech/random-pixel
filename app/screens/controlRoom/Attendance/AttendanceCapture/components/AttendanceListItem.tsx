import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AttendanceOptions from "./AttendanceOptions";
import { Colors } from "../../../../../services/utils/colors";
import { AttendanceStatus } from "../../../../../services/utils/enums";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  PRIMARY,
  STATUS_ERROR,
} from "../../../../../theme/color-tokens";
import CheckBox from "../../../../../components/CheckBox";
import { Student } from "../../../../../services/utils/api/useStudentAttendance";

interface AttendanceListItemProps {
  student: Student;
  isPopoverOpen: boolean;
  onPopoverOpen: () => void;
  onPopoverClose: () => void;
  attendanceStatus: AttendanceStatus | null;
  onAttendanceStatusChange: (status: AttendanceStatus) => void;
  onLeaveClick: () => void;
}

const getActionMenuOptions = (onLeaveClick, onPopoverClose) => [
  {
    label: "On leave",
    icon: "plane-departure" as IconProp,
    onPress: () => {
      onLeaveClick();
      onPopoverClose();
    },
  },
  {
    label: "View student profile",
    icon: "address-card" as IconProp,
    onPress: () => {
      // Handle view student profile action
    },
  },
  {
    label: "Mark attendance for upcoming days",
    icon: "calendar-check" as IconProp,
    onPress: () => {
      // Handle mark attendance for upcoming days action
    },
  },
];

const AttendanceListItem: React.FC<AttendanceListItemProps> =
  React.memo(
    ({
      student,
      isPopoverOpen,
      onPopoverOpen,
      onPopoverClose,
      attendanceStatus,
      onAttendanceStatusChange,
      onLeaveClick,
    }) => {
      const actionMenuOptions = useMemo(
        () => getActionMenuOptions(onLeaveClick, onPopoverClose),
        [onLeaveClick, onPopoverClose]
      );

      return (
        <View style={styles.container}>
          <View style={styles.rollNumberContainer}>
            <Text style={styles.rollNumberText}>
              {student.roll_number || "-"}
            </Text>
          </View>
          <View style={styles.studentNameContainer}>
            <Text style={styles.studentNameText}>
              {student.student_name}
            </Text>
          </View>
          <View style={styles.attendanceContainer}>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={attendanceStatus === AttendanceStatus.Present}
                onValueChange={() =>
                  onAttendanceStatusChange(AttendanceStatus.Present)
                }
                color={PRIMARY}
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={
                  attendanceStatus === AttendanceStatus.Absent ||
                  attendanceStatus === AttendanceStatus.OnLeave
                }
                onValueChange={() =>
                  onAttendanceStatusChange(AttendanceStatus.Absent)
                }
                color={STATUS_ERROR}
              />
              {attendanceStatus === AttendanceStatus.OnLeave && (
                <FontAwesomeIcon
                  icon="house-user"
                  size={24}
                  color={Colors.Accent}
                />
              )}
            </View>
            <AttendanceOptions
              isOpen={isPopoverOpen}
              onClose={onPopoverClose}
              onOpen={onPopoverOpen}
              student={student}
              options={actionMenuOptions}
            />
          </View>
        </View>
      );
    },
    (prevProps, nextProps) => {
      return (
        prevProps.student === nextProps.student &&
        prevProps.isPopoverOpen === nextProps.isPopoverOpen &&
        prevProps.attendanceStatus === nextProps.attendanceStatus
      );
    }
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 36,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rollNumberContainer: {
    width: 48,
  },
  rollNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  studentNameContainer: {
    width: 172,
  },
  studentNameText: {
    fontSize: 16,
  },
  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  checkBoxContainer: {
    padding: 12,
  },
});

export default AttendanceListItem;
