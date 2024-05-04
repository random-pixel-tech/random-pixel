import React from 'react';
import {
  Box,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  Text,
  CheckIcon,
} from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AttendanceOptions from './AttendanceOptions';
import {
  Student,
  AttendanceRecord,
} from '../../../services/utils/api/useStudentAttendance';
import { Colors } from '../../../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AttendanceStatus } from '../../../services/utils/enums';

interface AttendanceListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  isPopoverOpen: boolean;
  onPopoverOpen: () => void;
  onPopoverClose: () => void;
  attendanceStatus: AttendanceStatus | null;
  onAttendanceStatusChange: (status: AttendanceStatus) => void;
  onLeaveClick: () => void;
}

const AttendanceListItem: React.FC<AttendanceListItemProps> = ({
  student,
  attendanceRecord,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  attendanceStatus,
  onAttendanceStatusChange,
  onLeaveClick,
}) => {
  const options = [
    {
      label: 'On leave',
      icon: 'plane-departure' as IconProp,
      onPress: () => {
        onLeaveClick();
        onPopoverClose();
      },
    },
    {
      label: 'View student profile',
      icon: 'address-card' as IconProp,
      onPress: () => {
        // Handle view student profile action
      },
    },
    {
      label: 'Mark attendance for upcoming days',
      icon: 'calendar-check' as IconProp,
      onPress: () => {
        // Handle mark attendance for upcoming days action
      },
    },
  ];

  return (
    <Box display="flex" py="$2" my="$0.25" flexDirection="row" minHeight={36}>
      <Box w="$1/6" px="$4" py="$3">
        <Text size='lg'>{student.rollNumber || '-'}</Text>
      </Box>
      <Box w="$2/6" px="$4" py="$3">
        <Text numberOfLines={1} size='lg' >{student.name}</Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Checkbox
          value={`morning-present-${student.id}`}
          isChecked={attendanceStatus === AttendanceStatus.Present}
          onChange={() => onAttendanceStatusChange(AttendanceStatus.Present)}
          rounded="$md"
          aria-label={`Mark present for ${student.name}`}
          size='lg'
          py="$3"
          px="$6"
        >
          <CheckboxIndicator
            borderColor="$pixPrimary"
            bg={attendanceStatus === AttendanceStatus.Present ? '$pixPrimary' : 'transparent'}
          >
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </Checkbox>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Box flexDirection="row" alignItems="center">
          <Box minWidth={24}>
            <Checkbox
              value={`morning-absent-${student.id}`}
              isChecked={attendanceStatus === AttendanceStatus.Absent || attendanceStatus === AttendanceStatus.OnLeave}
              onChange={() => onAttendanceStatusChange(AttendanceStatus.Absent)}
              aria-label={`Mark absent for ${student.name}`}
              rounded="$md"
              size='lg'
              py="$3"
              px="$6"
            >
              <CheckboxIndicator
                borderColor="$pixOrange"
                bg={attendanceStatus === AttendanceStatus.Absent || attendanceStatus === AttendanceStatus.OnLeave ? '$pixOrange' : 'transparent'}
              >
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </Box>
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
        options={options}
      />
    </Box>
  );
};

export default AttendanceListItem;