import React, { useState } from 'react';
import { Button, CheckboxIcon, CheckIcon, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, Box, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ButtonText, Checkbox, CheckboxIndicator, ScrollView, ActionsheetScrollView } from '@gluestack-ui/themed';

interface FilterAttendanceProps {
    onSortOptionSelect: (option: string) => void;
    onFilterOptionSelect: (category: string, option: string) => void;
}

interface FilterOption {
    label: string;
    value: string;
}

const FilterAttendance: React.FC<FilterAttendanceProps> = ({ onSortOptionSelect, onFilterOptionSelect }) => {
    const [showActionsheet, setShowActionsheet] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Attendance Percentage');
    const [selectedTab, setSelectedTab] = useState('Filter');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
        attendance: [],
        class: [],
    });

    const handleClose = () => {
        setShowActionsheet(false);
        setSelectedFilters({
            attendance: [],
            class: [],
        });
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSortOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleFilterOptionSelect = (category: string, option: string) => {
        const updatedFilters = { ...selectedFilters };
        const categoryFilters = updatedFilters[category];

        if (categoryFilters.includes(option)) {
            updatedFilters[category] = categoryFilters.filter((filter) => filter !== option);
        } else {
            updatedFilters[category] = [...categoryFilters, option];
        }

        setSelectedFilters(updatedFilters);
    };

    const handleClear = () => {
        setSelectedFilters({
          attendance: [],
          class: [],
        });
        onFilterOptionSelect('attendance', '');
        onFilterOptionSelect('class', '');
        setSelectedOption('');
    };

      const handleApply = () => {
        // Apply selected filters
        Object.entries(selectedFilters).forEach(([category, options]) => {
          options.forEach((option) => {
            onFilterOptionSelect(category, option);
          });
        });
      
        // Apply sorting
        onSortOptionSelect(selectedOption);
      
        // If no filters are selected, clear the filters
        if (Object.values(selectedFilters).every((options) => options.length === 0)) {
          setSelectedFilters({
            attendance: [],
            class: [],
          });
          onFilterOptionSelect('attendance', '');
          onFilterOptionSelect('class', '');
        }
      
        setShowActionsheet(false);
      };
      

      const renderTabBar = () => (
        <Box flexDirection="row" w="$full" borderBottomWidth={1} borderBottomColor="$pixPrimaryLight100">
            {['Filter', 'Sort'].map(tab => (
                <Button
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    variant="outline"
                    w="$1/2"
                    rounded="$none"
                    borderWidth={0}
                    borderBottomWidth={selectedTab === tab ? 2 : 0}
                    borderColor={selectedTab === tab ? '$pixPrimaryLight50' : undefined}
                >
                    <ButtonText color="$pixPrimaryDark50">{tab}</ButtonText>
                </Button>
            ))}
        </Box>
    );

    const renderFilterOptions = (options: FilterOption[], category: string) => {
        return (
            <ActionsheetScrollView>
                {options.map(option => (
                    <ActionsheetItem key={option.value} onPress={() => handleFilterOptionSelect(category, option.value)}>
                        <Checkbox
                            value={option.value}
                            isChecked={selectedFilters[category].includes(option.value)}
                            onChange={() => handleFilterOptionSelect(category, option.value)}
                            rounded="$md"
                            aria-label={option.label}
                            size='lg'
                            p="$6"
                        >
                            <CheckboxIndicator
                                borderColor="$pixPrimary"
                                bg={selectedFilters[category].includes(option.value) ? '$pixPrimary' : 'transparent'}
                            >
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                        </Checkbox>
                        <ActionsheetItemText color='$pixText100'>{option.label}</ActionsheetItemText>
                    </ActionsheetItem>
                ))}
            </ActionsheetScrollView>
        );
    };
    
    const renderAttendanceOptions = () => renderFilterOptions([
        { label: '70% or below', value: '70% or below' },
        { label: '70% to 90%', value: '70% to 90%' },
        { label: 'Above 90%', value: 'Above 90%' }
    ], 'attendance');
    
    const renderClassOptions = () => renderFilterOptions(
        Array.from({ length: 10 }, (_, index) => ({
            label: `Class ${index + 1}`,
            value: `${index + 1}`
        })),
        'class'
    );
    

    const renderSortOptions = (options: string[]) => {
        return options.map(option => (
            <ActionsheetItem key={option} onPress={() => handleSortOptionSelect(option)}>
                <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === option ? 'bold' : 'normal'}>
                    {option}
                </ActionsheetItemText>
            </ActionsheetItem>
        ));
    };
    
    const renderRightOptions = () => {
        if (selectedTab === 'Filter') {
            switch (selectedOption) {
                case 'Attendance Percentage':
                    return renderAttendanceOptions();
                case 'Class':
                    return renderClassOptions();
                case 'Percentage':
                case 'Section':
                    return null;
                default:
                    return null;
            }
        } else if (selectedTab === 'Sort') {
            const sortOptions = [
                'Percentage: Low to High',
                'Percentage: High to Low',
                'Attendance: Low to High',
                'Attendance: High to Low',
                'Name: A to Z',
                'Name: Z to A',
                'Class: Low to High',
                'Class: High to Low'
            ];
            return renderSortOptions(sortOptions);
        }
        return null;
    };
    
    const renderFilterOptionsSidebar = () => {
        const options = [
            { label: 'Attendance Percentage', value: 'Attendance Percentage' },
            { label: 'Class', value: 'Class' },
            { label: 'Section', value: 'Section' }
        ];
    
        return options.map(option => (
            <ActionsheetItem key={option.value} onPress={() => handleOptionSelect(option.value)}>
                <ActionsheetItemText color='$pixText100' fontWeight={selectedOption === option.value ? 'bold' : 'normal'}>
                    {option.label}
                </ActionsheetItemText>
            </ActionsheetItem>
        ));
    };
    

    return (
        <Button onPress={() => setShowActionsheet(true)}>
            <ButtonText>{selectedOption}</ButtonText>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} closeOnOverlayClick zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="$5/6" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <Box w="$full">
                        {renderTabBar()}
                    </Box>
                    {selectedTab === 'Filter' && (
                        <Box flexDirection="row" style={{ flex: 1 }} p="$1" w="$full">
                            <Box w="$1/3" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                {renderFilterOptionsSidebar()}
                            </Box>
                            <Box w="$2/3" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                {renderRightOptions()}
                            </Box>
                        </Box>
                    )}
                    {selectedTab === 'Sort' && (
                        <Box flexDirection="row" style={{ flex: 1 }} p="$1" w="$full">
                            <Box w="$full" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                {renderRightOptions()}
                            </Box>
                        </Box>
                    )}
                    <Box w="$full" flexDirection="row" justifyContent="space-between" p="$4" px="$8" borderTopWidth={1} borderTopColor='$pixPrimaryLight100' mt="$1">
                        <Button variant="outline" onPress={handleClear} w="$1/2" mr="$1" rounded="$xl" borderWidth={0}>
                            <ButtonText>Clear</ButtonText>
                        </Button>
                        <Button onPress={handleApply} w="$1/2" m="$1" rounded="$xl">
                            <ButtonText>Apply</ButtonText>
                        </Button>
                    </Box>
                </ActionsheetContent>
            </Actionsheet>
        </Button>
    );
    
};

export default FilterAttendance;