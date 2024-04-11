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
    section,
    today,
    totalStudents,
    markedStudents,
    selectedStatus,
    handleStatusClick,
    getFilteredStudents,
    presentCount,
    absentCount,
    onLeaveCount,
    isPopoverOpen,
    handlePopoverOpen,
    handlePopoverClose,
  } = useAttendanceLogic();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header title="Attendance Summary" icon="ellipsis-vertical" />
      <AttendanceHeader
        className={className}
        section={section}
        today={today}
        summaryValues={{ markedStudents, totalStudents }}
      />
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
      <SummaryList
        filteredStudents={getFilteredStudents()}
        isPopoverOpen={isPopoverOpen}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose} />
    </Box>
  );
};

export default AttendanceSummary;