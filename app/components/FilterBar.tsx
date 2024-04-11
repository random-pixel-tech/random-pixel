import React from 'react';
import { Box } from '@gluestack-ui/themed';
import Chip from './Chip';

export interface FilterOption<T> {
  label: string;
  value: T;
  count: number;
}

interface FilterBarProps<T> {
  selectedValue: T | null;
  onFilterSelection: (value: T | null) => void;
  filterOptions: FilterOption<T>[];
}

const FilterBar = <T,>({
  selectedValue,
  onFilterSelection,
  filterOptions,
}: FilterBarProps<T>) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" p="$4">
      {filterOptions.map((option, index) => (
        <Chip
          key={index}
          label={option.label}
          count={option.count}
          isSelected={selectedValue === option.value}
          onPress={() => onFilterSelection(option.value)}
          isDisabled={option.count === 0}
        />
      ))}
    </Box>
  );
};

export default FilterBar;
