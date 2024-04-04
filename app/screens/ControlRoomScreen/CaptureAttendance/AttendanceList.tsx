import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import AttendanceListHeader from './AttendanceListHeader';
import AttendanceListItem from './AttendanceListItem';
import { Student, AttendanceRecord, AttendanceStatus } from '../../../services/utils/api/useStudentAttendance';

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
    <ScrollView>
      <Box display="flex" flexDirection="column">
        <AttendanceListHeader
        FirstColumnText="Roll No."
        SecondColumnText="Name"
        ThirdColumnText="P"
        FourthColumnText="A"
        icon='ellipsis-vertical'
        />
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
      </Box>
    </ScrollView>
  );
};

export default AttendanceList;