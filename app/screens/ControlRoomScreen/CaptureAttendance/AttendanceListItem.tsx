import React, { useMemo } from "react";
import {
  Box,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  Text,
  CheckIcon,
} from "@gluestack-ui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AttendanceOptions from "./AttendanceOptions";
import { Student } from "../../../services/utils/api/useStudentAttendance";
import { Colors } from "../../../services/utils/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AttendanceStatus } from "../../../services/utils/enums";

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

const AttendanceListItem: React.FC<AttendanceListItemProps> = React.memo(
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
      <Box
        display="flex"
        accessibilityHint="student attendance list item"
        gap={"$2"}
        py="$2"
        px={"$4"}
        flexDirection="row"
        alignItems="center"
        minHeight={36}
      >
        <Box w="$8">
          <Text size="lg">{student.roll_number || "-"}</Text>
        </Box>
        <Box flex={1}>
          <Text numberOfLines={1} size="lg">
            {student.student_name}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flex={1}
          alignItems="center"
          flexDirection="row"
        >
          <Box justifyContent="center">
            <Checkbox
              value={`morning-present-${student.scholar_id}`}
              isChecked={attendanceStatus === AttendanceStatus.Present}
              onChange={() => onAttendanceStatusChange(AttendanceStatus.Present)}
              rounded="$md"
              aria-label={`Mark present for ${student.student_name}`}
              size="lg"
              py="$3"
              px="$3"
            >
              <CheckboxIndicator
                borderColor="$pixPrimary"
                bg={attendanceStatus === AttendanceStatus.Present ? "$pixPrimary" : "transparent"}
              >
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </Box>
          <Box justifyContent="center">
            <Box display="flex" flexDirection="row" alignItems="center">
              <Checkbox
                py="$3"
                px="$3"
                value={`morning-absent-${student.scholar_id}`}
                isChecked={
                  attendanceStatus === AttendanceStatus.Absent ||
                  attendanceStatus === AttendanceStatus.OnLeave
                }
                onChange={() => onAttendanceStatusChange(AttendanceStatus.Absent)}
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
                <FontAwesomeIcon icon="house-user" size={24} color={Colors.Accent} />
              )}
            </Box>
          </Box>
          <AttendanceOptions
            isOpen={isPopoverOpen}
            onClose={onPopoverClose}
            onOpen={onPopoverOpen}
            student={student}
            options={actionMenuOptions}
          />
        </Box>
      </Box>
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

export default AttendanceListItem;
