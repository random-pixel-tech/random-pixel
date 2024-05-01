// AttendanceSummaryListItem.tsx
import React, { useState } from 'react';
import { Box, Text, ScrollView } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import AttendanceOptions from '../CaptureAttendance/AttendanceOptions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AttendanceSession } from '../../../services/utils/enums';

interface AttendanceSummaryListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  isPopoverOpen: boolean;
  onPopoverOpen: () => void;
  onPopoverClose: () => void;
  session: AttendanceSession;
}

const AttendanceSummaryListItem: React.FC<AttendanceSummaryListItemProps> = ({
  student,
  attendanceRecord,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  session,
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

  const attendanceStatus = attendanceRecord?.[`${session.toLowerCase()}Status`];

  return (
    <Box display="flex" py="$2" my="$0.25" flexDirection="row" minHeight={36}>
      <Box w="$1/6" px="$4" py="$3">
        <Text size='lg'>{student.rollNumber || '-'}</Text>
      </Box>
      <Box w="$4/6" px="$4" py="$3">
        <Text numberOfLines={1} size='lg'>{student.name}</Text>
      </Box>
      <Box w="$1/6" justifyContent="center" alignItems="center">
        <AttendanceOptions
          isOpen={isPopoverOpen}
          onClose={onPopoverClose}
          onOpen={onPopoverOpen}
          student={{ id: student.id, name: student.name, rollNumber: student.rollNumber }}
          options={options}
        />
      </Box>
    </Box>
  );
};

export default AttendanceSummaryListItem;