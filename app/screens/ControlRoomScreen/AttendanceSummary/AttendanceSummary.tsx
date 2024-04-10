import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import useAttendanceLogic from '../../../services/utils/api/useAttendanceLogic';
import Header from '../../../components/Header';
import AttendanceHeader from '../CaptureAttendance/AttendanceHeader';
import SummaryList from './AttendanceSummaryList';
import StatusFilter from './StatusFilter';

const AttendanceSummary = () => {
  const {
    className,
    today,
    totalStudents,
    markedStudents,
    selectedStatus,
    handleStatusClick,
    getFilteredStudents,
    presentCount,
    absentCount,
    onLeaveCount,
  } = useAttendanceLogic();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header title="Attendance Summary"  icon="ellipsis-vertical"/>
      <AttendanceHeader className={className} today={today} summaryValues={{ markedStudents, totalStudents }} />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusClick={handleStatusClick}
            allCount={totalStudents}
            presentCount={presentCount}
            absentCount={absentCount}
            onLeaveCount={onLeaveCount}
          />
        </ScrollView>
      </Box>
      <SummaryList filteredStudents={getFilteredStudents()} />
    </Box>
  );
};

export default AttendanceSummary;