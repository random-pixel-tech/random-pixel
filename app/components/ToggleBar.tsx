import React from 'react';
import { Box } from '@gluestack-ui/themed';
import FilterAttendance from './FilterAttendance';

interface ToggleBarProps {
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
}

const ToggleBar: React.FC<ToggleBarProps> = ({
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
}) => {
  return (
    <Box>
      <FilterAttendance
        showActionsheet={false} // Adjust as needed
        selectedTab={selectedTab}
        selectedFilters={selectedFilters}
        selectedFilterOption={selectedFilterOption}
        onClose={() => {}} // Adjust as needed
        onTabSelect={onTabSelect}
        onCategorySelect={onCategorySelect}
        onShowActionsheet={() => {}} // Adjust as needed
        onFilterOptionSelect={onFilterOptionSelect}
        onSortOptionSelect={onSortOptionSelect}
        onClear={onClear}
        onApply={onApply}
        sortOption={sortOption}
      />
    </Box>
  );
};

export default ToggleBar;
