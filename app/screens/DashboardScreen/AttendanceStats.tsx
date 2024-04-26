import React, { useState } from 'react';
import { Box } from '@gluestack-ui/themed';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
import { useAttendanceStats } from '../../services/utils/api/useAttendanceStats';
import DatePicker from '../../components/DatePicker';
import ToggleBar from '../../components/ToggleBar';

const AttendanceStats = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (position: number) => {
    setScrollPosition(position);
  };
  const {
    selectedDuration,
    handlePrevDay,
    handleNextDay,
    handleOptionSelect,
    isOptionsMenuOpen,
    handleRangeOptionsMenuOpen,
    handleRangeOptionsMenuClose,
    currentDate,
    startDate,
    endDate,
    showDatePicker,
    handleDatePickerCancel,
    handleDatePickerOk,
    showFilterActionsheet,
    handleOpenFilterActionsheet,
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
    handleCustomDateChange,
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
    searchButtonPress,
    filterButtonPress,
  } = useAttendanceStats();

  return (
    
    <Box bg="$pixWhite" w="$full" h="$full">
      <StatsHeader
        title="Attendance"
        selectedDuration={selectedDuration}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        handleOptionSelect={handleOptionSelect}
        isOptionsMenuOpen={isOptionsMenuOpen}
        handleRangeOptionsMenuOpen={handleRangeOptionsMenuOpen}
        handleRangeOptionsMenuClose={handleRangeOptionsMenuClose}
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
        showDatePicker={showDatePicker}
        isNextDisabled={isNextDisabled}
      />
      {scrollPosition === 0 && (
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
      handleOpenFilterActionsheet={handleOpenFilterActionsheet}
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
      searchButtonPress={searchButtonPress}
      filterButtonPress={filterButtonPress}
    />
  )}
      <AttendanceView
        selectedDuration={selectedDuration}
        startDate={startDate}
        endDate={endDate}
        attendanceDataWithPercentage={filteredAttendanceData}
        isLoading={isLoading}
        selectedButton={selectedButton}
        classData={classData}
        onScroll={handleScroll}

      />
      <DatePicker
        isOpen={showDatePicker}
        handleDatePickerCancel={handleDatePickerCancel}
        handleCustomDateChange={handleCustomDateChange}
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