import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import AttendanceSummaryListItem from './AttendanceSummaryListItem';
import AttendanceListHeader from '../CaptureAttendance/AttendanceListHeader';

interface AttendanceSummaryListProps {
  filteredStudents: Array<{ student: Student; attendanceRecord: AttendanceRecord | null; }>;
  isPopoverOpen: Record<string, boolean>;
  handlePopoverOpen: (studentId: string) => void;
  handlePopoverClose: (studentId: string) => void;
}

const AttendanceSummaryList: React.FC<AttendanceSummaryListProps> = ({
  filteredStudents,
  isPopoverOpen,
  handlePopoverOpen,
  handlePopoverClose,
}) => {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader FirstColumnText="Roll No." SecondColumnText="Name" icon="ellipsis-vertical" />
      <Box flex={1}>
        <ScrollView>
          {filteredStudents.map(({ student, attendanceRecord }) => (
            <AttendanceSummaryListItem
              key={student.id}
              student={student}
              attendanceRecord={attendanceRecord}
              isPopoverOpen={isPopoverOpen[student.id]}
              onPopoverOpen={() => handlePopoverOpen(student.id)}
              onPopoverClose={() => handlePopoverClose(student.id)}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default AttendanceSummaryList;