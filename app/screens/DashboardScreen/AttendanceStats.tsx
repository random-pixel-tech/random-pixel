import React, { useCallback, useRef, useState } from "react";
import { Box } from "@gluestack-ui/themed";
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import StatsHeader from "../../components/StatsHeader";
import AttendanceView from "../../components/AttendanceView";
import { useAttendanceStats } from "../../services/utils/api/useAttendanceStats";
import DatePicker from "../../components/DatePicker";
import StatsSearchAndFilterBar from "../../components/StatsSearchAndFilterBar";

const AttendanceStats = () => {
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
    selectedSegment,
    handleSegmentChange,
    classData,
    searchQuery,
    showSearchInput,
    handleSearchButtonClick,
    handleSearchInputChange,
    handleClearSearch,
    isClassOptionSelected,
    searchButtonPress,
    filterButtonPress,
    handleClearCategoryFilters,
    isHoliday,
  } = useAttendanceStats();

  const [isSearchBarVisible, setSearchBarVisible] = useState(true);
  const [yOffset, setYOffset] = useState(0);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    setYOffset((prevOffset) => {
      if (currentOffset < 0) return 0;
      if (currentOffset > prevOffset) {
        setSearchBarVisible(false);
      } else if (currentOffset <= prevOffset) {
        setSearchBarVisible(true);
      }
      return currentOffset;
    });
  }, []);

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
      {isSearchBarVisible && (
        <StatsSearchAndFilterBar
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
          selectedSegment={selectedSegment}
          onSegmentChange={handleSegmentChange}
          searchQuery={searchQuery}
          showSearchInput={showSearchInput}
          handleSearchButtonClick={handleSearchButtonClick}
          handleSearchInputChange={handleSearchInputChange}
          handleClearSearch={handleClearSearch}
          isClassOptionSelected={isClassOptionSelected}
          searchButtonPress={searchButtonPress}
          filterButtonPress={filterButtonPress}
          handleClearCategoryFilters={handleClearCategoryFilters}
          isLoading={isLoading}
        />
      )}
      <AttendanceView
        selectedDuration={selectedDuration}
        startDate={startDate}
        endDate={endDate}
        attendanceData={filteredAttendanceData}
        isLoading={isLoading}
        selectedSegment={selectedSegment}
        classData={classData}
        isHoliday={isHoliday}
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
