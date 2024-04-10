import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import AttendanceListHeader from './AttendanceListHeader';
import AttendanceListItem from './AttendanceListItem';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import { AttendanceStatus } from '../../../services/utils/enums';

interface AttendanceListProps {
  studentAttendanceData: Array<{
    student: Student;
    attendanceRecord: AttendanceRecord | null;
  }>;
  isPopoverOpen: Record<string, boolean>;
  onPopoverOpen: (studentId: string) => void;
  onPopoverClose: (studentId: string) => void;
  attendanceStatus: Record<string, AttendanceStatus | null>;
  onAttendanceStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onLeaveClick: (studentId: string) => void;
}

const AttendanceList: React.FC<AttendanceListProps> = ({
  studentAttendanceData,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  attendanceStatus,
  onAttendanceStatusChange,
  onLeaveClick,
}) => {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader
        FirstColumnText="Roll No."
        SecondColumnText="Name"
        ThirdColumnText="P"
        FourthColumnText="A"
      />
      <Box flex={1}>
        <ScrollView>
          {studentAttendanceData.map(({ student, attendanceRecord }) => (
            <AttendanceListItem
              key={student.id}
              student={student}
              attendanceRecord={attendanceRecord}
              isPopoverOpen={isPopoverOpen[student.id] || false}
              onPopoverOpen={() => onPopoverOpen(student.id)}
              onPopoverClose={() => onPopoverClose(student.id)}
              attendanceStatus={attendanceStatus[student.id]}
              onAttendanceStatusChange={(status) => onAttendanceStatusChange(student.id, status)}
              onLeaveClick={() => onLeaveClick(student.id)}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default AttendanceList;