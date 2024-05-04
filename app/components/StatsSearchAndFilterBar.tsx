import React from 'react';
import { Box, Input, InputField } from '@gluestack-ui/themed';
import AttendanceFilterButton from './AttendanceFilterButton';
import SegmentedControl from './SegmentedControl';
import SearchButton from './SearchButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { Pressable } from '@gluestack-ui/themed';

interface StatsSearchAndFilterBarProps {
  showActionsheet: boolean;
  selectedTab: string;
  selectedFilters: Record<string, string[]>;
  selectedFilterOption: string;
  onTabSelect: (option: string) => void;
  onCategorySelect: (option: string) => void;
  onFilterOptionSelect: (category: string, option: string) => void;
  onSortOptionSelect: (option: string) => void;
  onClear: () => void;
  onApply: () => void;
  sortOption: string;
  handleOpenFilterActionsheet: () => void;
  onClose: () => void;
  selectedButton: 'left' | 'right';
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
  searchQuery: string;
  showSearchInput: boolean;
  handleSearchButtonClick: (selectedButton: 'left' | 'right') => void;
  handleSearchInputChange: (value: string) => void;
  handleClearSearch: () => void;
  isClassOptionSelected: boolean;
  searchButtonPress: boolean;
  filterButtonPress: boolean;
  handleClearCategoryFilters: (category: string) => void;}

const StatsSearchAndFilterBar: React.FC<StatsSearchAndFilterBarProps> = ({
  showActionsheet,
  selectedTab,
  selectedFilters,
  selectedFilterOption,
  onTabSelect,
  onCategorySelect,
  onFilterOptionSelect,
  onSortOptionSelect,
  onClear,
  onApply,
  sortOption,
  handleOpenFilterActionsheet,
  onClose,
  selectedButton,
  onLeftButtonClick,
  onRightButtonClick,
  searchQuery,
  showSearchInput,
  handleSearchButtonClick,
  handleSearchInputChange,
  handleClearSearch,
  isClassOptionSelected,
  searchButtonPress,
  filterButtonPress,
  handleClearCategoryFilters
}) => {
  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <AttendanceFilterButton
          showActionsheet={showActionsheet}
          selectedTab={selectedTab}
          selectedFilters={selectedFilters}
          selectedFilterOption={selectedFilterOption}
          onClose={onClose}
          onTabSelect={onTabSelect}
          onCategorySelect={onCategorySelect}
          onFilterOptionSelect={onFilterOptionSelect}
          onSortOptionSelect={onSortOptionSelect}
          onClear={onClear}
          onApply={onApply}
          handleOpenFilterActionsheet={handleOpenFilterActionsheet}
          sortOption={sortOption}
          isClassOptionSelected={isClassOptionSelected}
          filterButtonPress={filterButtonPress}
          selectedButton={selectedButton}
          handleClearCategoryFilters={handleClearCategoryFilters}
        />
        <SegmentedControl
          leftButtonLabel="Classes"
          rightButtonLabel="Students"
          selectedButton={selectedButton}
          onLeftButtonClick={onLeftButtonClick}
          onRightButtonClick={onRightButtonClick}
        />
        <SearchButton
          onPress={handleSearchButtonClick}
          searchButtonPress={searchButtonPress}
          selectedButton={selectedButton}
        />
      </Box>
      {showSearchInput && (
        <Box mt="$2" display="flex" flexDirection="row" alignItems="center" px="$4">
          <Input variant="underlined" flex={1}>
            <InputField
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              placeholder={selectedButton === 'left' ? 'Search for class name' : 'Search for student name'}
            />
          </Input>
          <Pressable ml="$2" onPress={handleClearSearch}>
            <FontAwesomeIcon icon="xmark" size={18} color={Colors.Primary} />
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

export default StatsSearchAndFilterBar;