import React from 'react';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';

interface AttendanceSummaryListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
}

const AttendanceSummaryListItem: React.FC<AttendanceSummaryListItemProps> = ({
  student,
}) => {
  return (
    <Box display="flex" py="$6" flexDirection="row" minHeight={40}>
      <Box w="$1/6" px="$4">
        <Text size='lg'>{student.rollNumber || '-'}</Text>
      </Box>
      <Box w="$5/6" px="$4">
        <Text
        numberOfLines={1}
        size='lg'
        >{student.name}</Text>
      </Box>
    </Box>
  );
};

export default AttendanceSummaryListItem;