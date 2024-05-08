// AttendanceSummaryList.tsx
import React from 'react';
import { Box, FlatList } from '@gluestack-ui/themed';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import AttendanceSummaryListItem from './AttendanceSummaryListItem';
import AttendanceListHeader from '../CaptureAttendance/AttendanceListHeader';
import { AttendanceSession } from '../../../services/utils/enums';

interface AttendanceSummaryListProps {
  filteredStudents: Array<{
    student: Student;
    attendanceRecord: AttendanceRecord | null;
  }>;
  isPopoverOpen: Record<string, boolean>;
  handlePopoverOpen: (studentId: string) => void;
  handlePopoverClose: (studentId: string) => void;
  session: AttendanceSession;
}

const AttendanceSummaryList: React.FC<AttendanceSummaryListProps> = ({
  filteredStudents,
  isPopoverOpen,
  handlePopoverOpen,
  handlePopoverClose,
  session,
}) => {
  const renderItem = ({ item }: { item: { student: Student; attendanceRecord: AttendanceRecord | null } }) => (
    <AttendanceSummaryListItem
      key={item.student.scholar_id}
      student={item.student}
      attendanceRecord={item.attendanceRecord}
      isPopoverOpen={isPopoverOpen[item.student.scholar_id]}
      onPopoverOpen={() => handlePopoverOpen(item.student.scholar_id)}
      onPopoverClose={() => handlePopoverClose(item.student.scholar_id)}
      session={session}
    />
  );

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader
        FirstColumnText="R.N."
        SecondColumnText="Name"
        icon="ellipsis-vertical"
      />
      <Box flex={1}>
        <FlatList
          data={filteredStudents}
          renderItem={({ item }) => renderItem({ item: item as { student: Student; attendanceRecord: AttendanceRecord | null } })}
          keyExtractor={(item) => (item as { student: Student; attendanceRecord: AttendanceRecord | null }).student.scholar_id}
        />
      </Box>
    </Box>
  );
};

export default AttendanceSummaryList;