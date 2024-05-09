import React, { useRef } from 'react';
import { Box } from '@gluestack-ui/themed';
import { Animated } from 'react-native';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
import { useAttendanceStats } from '../../services/utils/api/useAttendanceStats';
import DatePicker from '../../components/DatePicker';
import StatsSearchAndFilterBar from '../../components/StatsSearchAndFilterBar';

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

  const scrollY = useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

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
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
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
        </Animated.View>
        <AttendanceView
          selectedDuration={selectedDuration}
          startDate={startDate}
          endDate={endDate}
          attendanceData={filteredAttendanceData}
          isLoading={isLoading}
          selectedSegment={selectedSegment}
          classData={classData}
          isHoliday={isHoliday}
        />
      </Animated.ScrollView>
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