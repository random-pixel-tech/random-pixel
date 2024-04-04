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
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader FirstColumnText="Roll No." SecondColumnText="Name" />
      <Box flex={1}>
        <ScrollView>
          {filteredStudents.map(({ student, attendanceRecord }) => (
            <SummaryListItem
              key={student.id}
              student={student}
              attendanceRecord={attendanceRecord}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default SummaryList;