import React from 'react';
import { Button, CheckboxIcon, CheckIcon, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, Box, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ButtonText, Checkbox, CheckboxIndicator, ScrollView, ActionsheetScrollView } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';

interface FilterAttendanceProps {
    showActionsheet: boolean;
    selectedTab: string;
    selectedFilters: Record<string, string[]>;
    selectedFilterOption: string;
    onClose: () => void;
    onTabSelect: (option: string) => void;
    onCategorySelect: (option: string) => void;
    onShowActionsheet: (show: boolean) => void;
    onFilterOptionSelect: (category: string, option: string) => void;
    onSortOptionSelect: (option: string) => void;
    onClear: () => void;
    onApply: () => void;
    sortOption: string;
}

interface FilterOption {
    label: string;
    value: string;
}

const FilterAttendance: React.FC<FilterAttendanceProps> = ({
    showActionsheet,
    selectedTab,
    selectedFilters,
    selectedFilterOption,
    onClose,
    onTabSelect,
    onShowActionsheet,
    onFilterOptionSelect,
    onSortOptionSelect,
    onClear,
    onApply,
    sortOption,
    onCategorySelect
}) => {
    const renderTabBar = () => (
        <Box flexDirection="row" w="$full" borderBottomWidth={1} borderBottomColor="$pixPrimaryLight100">
            {['Filter', 'Sort'].map(tab => (
                <Button
                    key={tab}
                    onPress={() => onTabSelect(tab)}
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
                    <ActionsheetItem key={option.value} onPress={() => onFilterOptionSelect(category, option.value)}>
                        <Checkbox
                            value={option.value}
                            isChecked={selectedFilters[category].includes(option.value)}
                            onChange={() => onFilterOptionSelect(category, option.value)}
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
            <ActionsheetItem key={option} onPress={() => onSortOptionSelect(option)}>
                <ActionsheetItemText color="$pixText100" fontWeight={sortOption === option ? 'bold' : 'normal'}>
                    {option}
                </ActionsheetItemText>
            </ActionsheetItem>
        ));
    };

    const renderRightOptions = () => {
        if (selectedTab === 'Filter') {
            switch (selectedFilterOption) {
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
            <ActionsheetItem key={option.value} onPress={() => onCategorySelect(option.value)}>
                <ActionsheetItemText color='$pixText100' fontWeight={selectedFilterOption === option.value ? 'bold' : 'normal'}>
                    {option.label}
                </ActionsheetItemText>
            </ActionsheetItem>
        ));
    };

    return (
        <>
            <Button onPress={() => onShowActionsheet(true)} variant='outline' w="$1/2">
            {/* <ButtonText>{selectedFilterOption} */}
            <FontAwesomeIcon icon="filter" size={18} color={Colors.Primary}/>
            {/* </ButtonText> */}
            <Actionsheet isOpen={showActionsheet} onClose={onClose} closeOnOverlayClick zIndex={999}>
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
                        <Button variant="outline" onPress={onClear} w="$1/2" mr="$1" rounded="$xl" borderWidth={0}>
                            <ButtonText>Clear</ButtonText>
                        </Button>
                        <Button onPress={onApply} w="$1/2" m="$1" rounded="$xl">
                            <ButtonText>Apply</ButtonText>
                        </Button>
                    </Box>
                </ActionsheetContent>
            </Actionsheet>
            </Button>
        </>
    );
};

export default FilterAttendance;