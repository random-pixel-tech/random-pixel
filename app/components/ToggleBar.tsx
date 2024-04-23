import React from 'react';
import { Box } from '@gluestack-ui/themed';
import FilterAttendance from './FilterAttendance';
import ToggleButtons from './ToggleButtons';
import SearchButton from './SearchButton';

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
}) => {
    return (
        <Box display='flex' flexDirection='row' alignContent='center'>
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
            />
            <ToggleButtons
                  leftButtonLabel="Classes"
                  rightButtonLabel="Students"
                  selectedButton={selectedButton}
                  onLeftButtonClick={onLeftButtonClick}
                  onRightButtonClick={onRightButtonClick}
            />
            <SearchButton />
        </Box>
    );
};

export default ToggleBar;