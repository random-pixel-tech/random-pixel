import React from 'react';
import { Box } from '@gluestack-ui/themed';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
import { useStatsHeaderState } from '../../services/utils/statsHeaderState';
import DatePicker from '../../components/DatePicker';

const AttendanceStats = () => {
  const {
    selectedOption,
    handlePrevDay,
    handleNextDay,
    handleOptionSelect,
    isOptionsMenuOpen,
    handleOptionsMenuOpen,
    handleOptionsMenuClose,
    currentDate,
    startDate,
    endDate,
    fetchAttendanceByTime,
    showDatePicker,
    handleDatePickerCancel,
    handleDatePickerOk,
  } = useStatsHeaderState();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <StatsHeader
        title="Attendance"
        selectedOption={selectedOption}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        handleOptionSelect={handleOptionSelect}
        isOptionsMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuOpen={handleOptionsMenuOpen}
        handleOptionsMenuClose={handleOptionsMenuClose}
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
        showDatePicker={showDatePicker}
      />
      <AttendanceView
        selectedOption={selectedOption}
        startDate={startDate}
        endDate={endDate}
        fetchAttendanceByTime={fetchAttendanceByTime}
      />
      <DatePicker
        isOpen={showDatePicker}
        handleDatePickerCancel={handleDatePickerCancel}
        handleDatePickerOk={handleDatePickerOk}
      />
    </Box>
  );
};

export default AttendanceStats;