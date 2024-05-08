import React from 'react';
import { Box, FlatList, Text } from '@gluestack-ui/themed';
import AttendanceListHeader from './AttendanceListHeader';
import AttendanceListItem from './AttendanceListItem';
import { Student, AttendanceRecord } from '../../../services/utils/api/useStudentAttendance';
import { AttendanceStatus } from '../../../services/utils/enums';
import HolidayMessage from '../../../components/HolidayMessage';

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
    return <HolidayMessage />;
  }

  const renderItem = ({ item }: { item: { student: Student; attendanceRecord: AttendanceRecord | null } }) => (
    <AttendanceListItem
      key={item.student.scholar_id}
      student={item.student}
      attendanceRecord={item.attendanceRecord}
      isPopoverOpen={isPopoverOpen[item.student.scholar_id] || false}
      onPopoverOpen={() => onPopoverOpen(item.student.scholar_id)}
      onPopoverClose={() => onPopoverClose(item.student.scholar_id)}
      attendanceStatus={attendanceStatus[item.student.scholar_id]}
      onAttendanceStatusChange={(status) => onAttendanceStatusChange(item.student.scholar_id, status)}
      onLeaveClick={() => onLeaveClick(item.student.scholar_id)}
    />
  );

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <AttendanceListHeader
        FirstColumnText="R.N."
        SecondColumnText="Name"
        ThirdColumnText="P"
        FourthColumnText="A"
      />
      <Box flex={1}>
        <FlatList
          data={studentAttendanceData}
          renderItem={({ item }) => renderItem({ item: item as { student: Student; attendanceRecord: AttendanceRecord | null } })}
          keyExtractor={(item) => (item as { student: Student; attendanceRecord: AttendanceRecord | null }).student.scholar_id}
        />
      </Box>
    </Box>
  );
};

export default AttendanceList;