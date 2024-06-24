import React, { useMemo } from "react";
import {
  Box,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
} from "@gluestack-ui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AttendanceOptions from "./AttendanceOptions";
import { Student } from "../../../../../services/utils/api/useStudentAttendance";
import { Colors } from "../../../../../services/utils/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AttendanceStatus } from "../../../../../services/utils/enums";
import { StyleSheet, View, Text } from "react-native";

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
          <View style={{ width: 48 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {student.roll_number || "-"}
            </Text>
          </View>
          <View style={{ width: 172 }}>
            <Text style={{ fontSize: 16 }}>
              {student.student_name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Checkbox
                value={`morning-present-${student.scholar_id}`}
                isChecked={
                  attendanceStatus === AttendanceStatus.Present
                }
                onChange={() =>
                  onAttendanceStatusChange(AttendanceStatus.Present)
                }
                rounded="$md"
                aria-label={`Mark present for ${student.student_name}`}
                size="lg"
                py="$3"
                px="$3"
              >
                <CheckboxIndicator
                  borderColor="$pixPrimary"
                  bg={
                    attendanceStatus === AttendanceStatus.Present
                      ? "$pixPrimary"
                      : "transparent"
                  }
                >
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
            </View>
            <View>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Checkbox
                  py="$3"
                  px="$3"
                  value={`morning-absent-${student.scholar_id}`}
                  isChecked={
                    attendanceStatus === AttendanceStatus.Absent ||
                    attendanceStatus === AttendanceStatus.OnLeave
                  }
                  onChange={() =>
                    onAttendanceStatusChange(AttendanceStatus.Absent)
                  }
                  aria-label={`Mark absent for ${student.student_name}`}
                  rounded="$md"
                  size="lg"
                >
                  <CheckboxIndicator
                    borderColor="$pixOrange"
                    bg={
                      attendanceStatus === AttendanceStatus.Absent ||
                      attendanceStatus === AttendanceStatus.OnLeave
                        ? "$pixOrange"
                        : "transparent"
                    }
                  >
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
                {attendanceStatus === AttendanceStatus.OnLeave && (
                  <FontAwesomeIcon
                    icon="house-user"
                    size={24}
                    color={Colors.Accent}
                  />
                )}
              </Box>
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
  textEntries: {},
});

export default AttendanceListItem;
