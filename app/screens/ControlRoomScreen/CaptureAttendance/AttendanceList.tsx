import React from 'react';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import AttendanceListHeader from './AttendanceListHeader';
import AttendanceListItem from './AttendanceListItem';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import { AttendanceStatus } from '../../../services/utils/enums';

interface AttendanceListProps {
  studentAttendanceData: Array<{ student: Student; attendanceRecord: AttendanceRecord | null }>;
  isPopoverOpen: Record<string, boolean>;
  onPopoverOpen: (studentId: string) => void;
  onPopoverClose: (studentId: string) => void;
  attendanceStatus: Record<string, AttendanceStatus | null>;
  onAttendanceStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onLeaveClick: (studentId: string) => void;
  isHoliday: boolean;
}

const AttendanceList: React.FC<AttendanceListProps> = ({
  studentAttendanceData,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  attendanceStatus,
  onAttendanceStatusChange,
  onLeaveClick,
  isHoliday,
}) => {
  if (isHoliday) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Text fontWeight="bold">
          Today is a holiday!
        </Text>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader FirstColumnText="R.N." SecondColumnText="Name" ThirdColumnText="P" FourthColumnText="A" />
      <Box flex={1}>
        <ScrollView>
          {studentAttendanceData.map(({ student, attendanceRecord }) => (
            <AttendanceListItem
              key={student.scholar_id}
              student={student}
              attendanceRecord={attendanceRecord}
              isPopoverOpen={isPopoverOpen[student.scholar_id] || false}
              onPopoverOpen={() => onPopoverOpen(student.scholar_id)}
              onPopoverClose={() => onPopoverClose(student.scholar_id)}
              attendanceStatus={attendanceStatus[student.scholar_id]}
              onAttendanceStatusChange={(status) => onAttendanceStatusChange(student.scholar_id, status)}
              onLeaveClick={() => onLeaveClick(student.scholar_id)}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default AttendanceList;