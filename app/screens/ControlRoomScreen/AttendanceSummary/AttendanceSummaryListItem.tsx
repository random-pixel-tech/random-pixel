import React, { useState } from 'react';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import AttendanceOptions from '../CaptureAttendance/AttendanceOptions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface AttendanceSummaryListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  isPopoverOpen: boolean;
  onPopoverOpen: () => void;
  onPopoverClose: () => void;
}

const AttendanceSummaryListItem: React.FC<AttendanceSummaryListItemProps> = ({
  student,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
}) => {
  const options = [
    {
      label: 'View student profile',
      icon: 'address-card' as IconProp,
      onPress: () => {
        // Handle view student profile action
      },
    },
  ];
  return (
    <Box display="flex" py="$6" flexDirection="row" minHeight={40}>
      <Box w="$1/6" px="$4">
        <Text size='lg'>{student.rollNumber || '-'}</Text>
      </Box>
      <Box w="$4/6" px="$4">
        <Text numberOfLines={1} size='lg'>{student.name}</Text>
      </Box>
      <Box w="$1/6" justifyContent="center" alignItems="center">
        <AttendanceOptions
          isOpen={isPopoverOpen}
          onClose={onPopoverClose}
          onOpen={onPopoverOpen}
          student={{
            id: student.id,
            name: student.name,
            rollNumber: student.rollNumber,
          }}
          options={options}
          />
      </Box>
    </Box>
  );
};

export default AttendanceSummaryListItem;