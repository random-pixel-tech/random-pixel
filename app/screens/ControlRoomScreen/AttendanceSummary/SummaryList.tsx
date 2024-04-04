import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import SummaryListItem from './SummaryListItem';
import AttendanceListHeader from '../CaptureAttendance/AttendanceListHeader';

interface SummaryListProps {
  filteredStudents: Array<{
    student: Student;
    attendanceRecord: AttendanceRecord | null;
  }>;
}

const SummaryList: React.FC<SummaryListProps> = ({ filteredStudents }) => {
  return (
    <ScrollView>
      <Box display="flex" flexDirection="column">
      <AttendanceListHeader
        FirstColumnText="Roll No."
        SecondColumnText="Name"
        />
        {filteredStudents.map(({ student, attendanceRecord }) => (
          <SummaryListItem key={student.id} student={student} attendanceRecord={attendanceRecord} />
        ))}
      </Box>
    </ScrollView>
  );
};

export default SummaryList;