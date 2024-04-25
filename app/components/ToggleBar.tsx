import React from 'react';
import { Box, Input, InputField } from '@gluestack-ui/themed';
import FilterAttendance from './FilterAttendance';
import ToggleButtons from './ToggleButtons';
import SearchButton from './SearchButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';

interface ToggleBarProps {
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
  onShowActionsheet: (show: boolean) => void;
  onClose: () => void;
  selectedButton: 'left' | 'right';
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
  searchQuery: string;
  showSearchInput: boolean;
  handleSearchButtonClick: () => void;
  handleSearchInputChange: (value: string) => void;
  handleClearSearch: () => void;
  isClassOptionSelected: boolean;
}

const ToggleBar: React.FC<ToggleBarProps> = ({
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
  onShowActionsheet,
  onClose,
  selectedButton,
  onLeftButtonClick,
  onRightButtonClick,
  searchQuery,
  showSearchInput,
  handleSearchButtonClick,
  handleSearchInputChange,
  handleClearSearch,
  isClassOptionSelected
}) => {
  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <FilterAttendance
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
          onShowActionsheet={onShowActionsheet}
          sortOption={sortOption}
          isClassOptionSelected={isClassOptionSelected}
        />
        <ToggleButtons
          leftButtonLabel="Classes"
          rightButtonLabel="Students"
          selectedButton={selectedButton}
          onLeftButtonClick={onLeftButtonClick}
          onRightButtonClick={onRightButtonClick}
        />
        <SearchButton onPress={handleSearchButtonClick} />
      </Box>
      {showSearchInput && (
        <Box mt="$2" display="flex" flexDirection="row" alignItems="center" px="$4">
          <Input variant="underlined" flex={1}>
            <InputField
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              placeholder="Search..."
            />
          </Input>
          <Box ml="$2" onTouchEnd={handleClearSearch}>
            <FontAwesomeIcon icon="xmark" size={18} color={Colors.Primary} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ToggleBar;