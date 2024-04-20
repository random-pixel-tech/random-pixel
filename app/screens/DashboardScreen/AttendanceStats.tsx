import React from 'react';
import { Box } from '@gluestack-ui/themed';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
import { useStatsHeaderState } from '../../services/utils/statsHeaderState';
import DatePicker from '../../components/DatePicker';
import FilterAttendance from '../../components/FilterAttendance';

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
    showFilterActionsheet,
    setShowFilterActionsheet,
    selectedFilterTab,
    selectedFilterOption,
    selectedFilters,
    handleCloseFilterActionsheet,
    handleFilterOptionSelect,
    handleFilterTabSelect,
    handleFilterSortOptionSelect,
    handleFilterClear,
    handleFilterApply,
    sortOption,
    handleCategoryOptionSelect,
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
      <FilterAttendance
        showActionsheet={showFilterActionsheet}
        selectedTab={selectedFilterTab}
        selectedFilters={selectedFilters}
        selectedFilterOption={selectedFilterOption}
        onClose={handleCloseFilterActionsheet}
        onTabSelect={handleFilterTabSelect}
        onCategorySelect={handleCategoryOptionSelect}
        onFilterOptionSelect={handleFilterOptionSelect}
        onSortOptionSelect={handleFilterSortOptionSelect}
        onClear={handleFilterClear}
        onApply={handleFilterApply}
        onShowActionsheet={setShowFilterActionsheet}
        sortOption={sortOption}
      />
      <AttendanceView
        selectedOption={selectedOption}
        startDate={startDate}
        endDate={endDate}
        fetchAttendanceByTime={fetchAttendanceByTime}
        // selectedFilters={selectedFilters}
        sortOption={sortOption}
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