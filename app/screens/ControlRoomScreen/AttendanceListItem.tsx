import React from 'react';
import { Box, Checkbox, CheckboxIcon, CheckboxIndicator, Text, CheckIcon } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AttendanceOptions from './AttendanceOptions';
import { Student, AttendanceRecord, AttendanceStatus } from '../../services/utils/api/useStudentAttendance';
import { Colors } from '../../services/utils/colors';


interface AttendanceListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  isPopoverOpen: boolean;
  onPopoverOpen: () => void;
  onPopoverClose: () => void;
  attendanceStatus: AttendanceStatus | null;
  onCheckboxChange: (status: AttendanceStatus) => void;
  onLeaveClick: () => void;
}

const AttendanceListItem: React.FC<AttendanceListItemProps> = ({
  student,
  attendanceRecord,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  attendanceStatus,
  onCheckboxChange,
  onLeaveClick,
}) => {
  return (
    <Box display="flex" py="$2" flexDirection="row" minHeight={40}>
      <Box w="$1/6" px="$4">
        <Text>{student.rollNumber || '-'}</Text>
      </Box>
      <Box w="$2/5" px="$4">
        <Text
        numberOfLines={1}
        style={{
          overflow: 'hidden',
        }}
        >{student.name}</Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Checkbox
          value={`morning-present-${student.id}`}
          isChecked={attendanceStatus === AttendanceStatus.Present}
          onChange={() => onCheckboxChange(AttendanceStatus.Present)}
          rounded="$md"
          aria-label={`Mark present for ${student.name}`}
        >
          <CheckboxIndicator borderColor="$pixPrimary" bg={attendanceStatus === AttendanceStatus.Present ? '$pixPrimary' : 'transparent'}
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
              onChange={() => onCheckboxChange(AttendanceStatus.Absent)}
              aria-label={`Mark absent for ${student.name}`}
              rounded="$md"
            >
              <CheckboxIndicator borderColor="$pixOrange" bg={attendanceStatus === AttendanceStatus.Absent || attendanceStatus === AttendanceStatus.OnLeave ? '$pixOrange' : 'transparent'}>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </Box>
          {attendanceStatus === AttendanceStatus.OnLeave && (
            <FontAwesomeIcon icon="house-user" size={20} color={Colors.Accent} />
          )}
        </Box>
      </Box>
      <AttendanceOptions
        isOpen={isPopoverOpen}
        onClose={onPopoverClose}
        onOpen={onPopoverOpen}
        student={student}
        onLeaveClick={onLeaveClick}
      />
    </Box>
  );
};

export default AttendanceListItem;