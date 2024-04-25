import React from 'react';
import { Box } from '@gluestack-ui/themed';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
import { useAttendanceStats } from '../../services/utils/api/useAttendanceStats';
import DatePicker from '../../components/DatePicker';
import ToggleBar from '../../components/ToggleBar';

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
    filteredAttendanceData,
    isLoading,
    isNextDisabled,
    handleOk,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    setStartDay,
    setStartMonth,
    setStartYear,
    setEndDay,
    setEndMonth,
    setEndYear,
    isValidDay,
    isValidMonth,
    isValidYear,
    selectedButton,
    handleLeftButtonClick,
    handleRightButtonClick,
    classData,
    searchQuery,
    showSearchInput,
    handleSearchButtonClick,
    handleSearchInputChange,
    handleClearSearch,
    isClassOptionSelected,
  } = useAttendanceStats();

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
        isNextDisabled={isNextDisabled}
      />
      <ToggleBar
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
        selectedButton={selectedButton}
        onLeftButtonClick={handleLeftButtonClick}
        onRightButtonClick={handleRightButtonClick}
        searchQuery={searchQuery}
        showSearchInput={showSearchInput}
        handleSearchButtonClick={handleSearchButtonClick}
        handleSearchInputChange={handleSearchInputChange}
        handleClearSearch={handleClearSearch}
        isClassOptionSelected={isClassOptionSelected}
      />
      <AttendanceView
        selectedOption={selectedOption}
        startDate={startDate}
        endDate={endDate}
        attendanceDataWithPercentage={filteredAttendanceData}
        isLoading={isLoading}
        selectedButton={selectedButton}
        classData={classData}
      />
      <DatePicker
        isOpen={showDatePicker}
        handleDatePickerCancel={handleDatePickerCancel}
        handleOk={handleOk}
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        setStartDay={setStartDay}
        setStartMonth={setStartMonth}
        setStartYear={setStartYear}
        setEndDay={setEndDay}
        setEndMonth={setEndMonth}
        setEndYear={setEndYear}
        isValidDay={isValidDay}
        isValidMonth={isValidMonth}
        isValidYear={isValidYear}
      />
    </Box>
  );
};

export default AttendanceStats;