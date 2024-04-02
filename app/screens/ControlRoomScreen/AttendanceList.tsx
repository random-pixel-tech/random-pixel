import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import AttendanceListHeader from './AttendanceListHeader';
import AttendanceListItem from './AttendanceListItem';
import { Student, AttendanceRecord, AttendanceStatus } from '../../services/utils/api/useStudentAttendance';

interface AttendanceListProps {
  studentAttendanceData: Array<{
    student: Student;
    attendanceRecord: AttendanceRecord | null;
  }>;
  isPopoverOpen: Record<string, boolean>;
  handleOpenPopover: (studentId: string) => void;
  handleClosePopover: (studentId: string) => void;
  selectedCheckbox: Record<string, AttendanceStatus | null>;
  handleCheckboxChange: (studentId: string, status: AttendanceStatus) => void;
  handleLeaveClick: (studentId: string) => void;
}

const AttendanceList: React.FC<AttendanceListProps> = ({
  studentAttendanceData,
  isPopoverOpen,
  handleOpenPopover,
  handleClosePopover,
  selectedCheckbox,
  handleCheckboxChange,
  handleLeaveClick,
}) => {
  return (
    <ScrollView>
      <Box display="flex" flexDirection="column">
        <AttendanceListHeader />
        {studentAttendanceData.map(({ student, attendanceRecord }) => (
          <AttendanceListItem
            key={student.id}
            student={student}
            attendanceRecord={attendanceRecord}
            isPopoverOpen={isPopoverOpen[student.id] || false}
            handleOpenPopover={() => handleOpenPopover(student.id)}
            handleClosePopover={() => handleClosePopover(student.id)}
            selectedCheckbox={selectedCheckbox[student.id]}
            handleCheckboxChange={(status) => handleCheckboxChange(student.id, status)}
            handleLeaveClick={() => handleLeaveClick(student.id)}
          />
        ))}
      </Box>
    </ScrollView>
  );
};

export default AttendanceList;