import React, { useState } from 'react';
import { Button, CheckboxIcon, CheckIcon, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, Box, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ButtonText, Checkbox, CheckboxIndicator } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface FilterAttendanceProps {
    onSortOptionSelect: (option: string) => void;
    onFilterOptionSelect: (filters: string[]) => void;
}

const FilterAttendance: React.FC<FilterAttendanceProps> = ({ onSortOptionSelect, onFilterOptionSelect }) => {
    const [showActionsheet, setShowActionsheet] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Percentage');
    const [selectedTab, setSelectedTab] = useState('Filter');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleClose = () => {
        setShowActionsheet(false);
        setSelectedFilters([]);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSortOptionSelect = (option: string) => {
        onSortOptionSelect(option);
        setSelectedOption(option);
    };

    const handleFilterOptionSelect = (option: string) => {
        const updatedFilters = selectedFilters.includes(option)
            ? selectedFilters.filter((filter) => filter !== option)
            : [...selectedFilters, option];
        setSelectedFilters(updatedFilters);
    };

    const handleClear = () => {
        setSelectedFilters([]);
        setShowActionsheet(false);
    };

    const handleApply = () => {
        onFilterOptionSelect(selectedFilters);
        setShowActionsheet(false);
    };

    const renderTabBar = () => (
        <Box flexDirection="row" w="$full" borderBottomWidth={1} borderBottomColor='$pixPrimaryLight100'>
            <Button onPress={() => setSelectedTab('Filter')} variant="outline" w="$1/2" rounded="$none" borderWidth={0}
                borderBottomWidth={selectedTab === 'Filter' ? 2 : 0}
                borderColor={selectedTab === 'Filter' ? '$pixPrimaryLight50' : undefined}>
                <ButtonText color="$pixPrimaryDark50">Filter</ButtonText>
            </Button>
            <Button onPress={() => setSelectedTab('Sort')} variant="outline" w="$1/2" rounded="$none" borderWidth={0}
                borderBottomWidth={selectedTab === 'Sort' ? 2 : 0}
                borderColor={selectedTab === 'Sort' ? '$pixPrimaryLight50' : undefined}>
                <ButtonText color="$pixPrimaryDark50">Sort</ButtonText>
            </Button>
        </Box>
    );

    const renderRightOptions = () => {
        if (selectedTab === 'Filter') {
            switch (selectedOption) {
                case 'Attendance':
                    return (
                        <>
                            <ActionsheetItem onPress={() => handleFilterOptionSelect('70% or below')}>
                                <Checkbox
                                    value="70% or below"
                                    isChecked={selectedFilters.includes('70% or below')}
                                    onChange={() => handleFilterOptionSelect('70% or below')}
                                    rounded="$md"
                                    aria-label="70% or below"
                                    size='lg'
                                    p="$6"
                                >
                                    <CheckboxIndicator
                                        borderColor="$pixPrimary"
                                        bg={selectedFilters.includes('70% or below') ? '$pixPrimary' : 'transparent'}

                                    >
                                        <CheckboxIcon as={CheckIcon} />

                                    </CheckboxIndicator>
                                </Checkbox>
                                <ActionsheetItemText color='$pixText100'>70% or below</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={() => handleFilterOptionSelect('70% to 90%')}>
                                <Checkbox
                                    value="70% to 90%"
                                    isChecked={selectedFilters.includes('70% to 90%')}
                                    onChange={() => handleFilterOptionSelect('70% to 90%')}
                                    rounded="$md"
                                    aria-label="70% to 90%"
                                    size='lg'
                                    p="$6"
                                >
                                    <CheckboxIndicator
                                        borderColor="$pixPrimary"
                                        bg={selectedFilters.includes('70% to 90%') ? '$pixPrimary' : 'transparent'}

                                    >
                                        <CheckboxIcon as={CheckIcon} />

                                    </CheckboxIndicator>
                                </Checkbox>
                                <ActionsheetItemText color='$pixText100'>70% to 90%</ActionsheetItemText>
                            </ActionsheetItem>
                            <ActionsheetItem onPress={() => handleFilterOptionSelect('Above 90%')}>
                                <Checkbox
                                    value="Above 90%"
                                    isChecked={selectedFilters.includes('Above 90%')}
                                    onChange={() => handleFilterOptionSelect('Above 90%')}
                                    rounded="$md"
                                    aria-label="Above 90%"
                                    size='lg'
                                    p="$6"
                                >
                                    <CheckboxIndicator
                                        borderColor="$pixPrimary"
                                        bg={selectedFilters.includes('Above 90%') ? '$pixPrimary' : 'transparent'}

                                    >
                                        <CheckboxIcon as={CheckIcon} />

                                    </CheckboxIndicator>
                                </Checkbox>
                                <ActionsheetItemText color='$pixText100'>Above 90%</ActionsheetItemText>
                            </ActionsheetItem>
                        </>
                    );
                case 'Percentage':
                case 'Class':
                case 'Section':
                    return null;
                default:
                    return null;
            }
        } else if (selectedTab === 'Sort') {
            return (
                <>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Percentage: Low to High')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Percentage: Low to High' ? 'bold' : 'normal'}>Percentage: Low to High</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Percentage: High to Low')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Percentage: High to Low' ? 'bold' : 'normal'}>Percentage: High to Low</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Attendance: Low to High')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Attendance: Low to High' ? 'bold' : 'normal'}>Attendance: Low to High</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Attendance: High to Low')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Attendance: High to Low' ? 'bold' : 'normal'}>Attendance: High to Low</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Name: A to Z')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Name: A to Z' ? 'bold' : 'normal'}>Name: A to Z</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => handleSortOptionSelect('Name: Z to A')}>
                        <ActionsheetItemText color="$pixText100" fontWeight={selectedOption === 'Name: Z to A' ? 'bold' : 'normal'}>Name: Z to A</ActionsheetItemText>
                    </ActionsheetItem>
                </>
            );
        }
        return null;
    };

    return (
        <Button onPress={() => setShowActionsheet(true)}>
            <ButtonText>{selectedOption}</ButtonText>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} closeOnOverlayClick zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="$3/4" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <Box w="$full">
                        {renderTabBar()}
                    </Box>
                    {selectedTab === 'Filter' && (
                        <Box flexDirection="row" style={{ flex: 1 }} p="$1" w="$full">
                            <Box w="$1/3" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                <ActionsheetItem onPress={() => handleOptionSelect('Percentage')}>
                                    <ActionsheetItemText color='$pixText100' fontWeight={selectedOption === 'Percentage' ? 'bold' : 'normal'}>Percentage</ActionsheetItemText>
                                </ActionsheetItem>
                                <ActionsheetItem onPress={() => handleOptionSelect('Attendance')}>
                                    <ActionsheetItemText color='$pixText100' fontWeight={selectedOption === 'Attendance' ? 'bold' : 'normal'}>Attendance</ActionsheetItemText>
                                </ActionsheetItem>
                                <ActionsheetItem onPress={() => handleOptionSelect('Class')}>
                                    <ActionsheetItemText color='$pixText100' fontWeight={selectedOption === 'Class' ? 'bold' : 'normal'}>Class</ActionsheetItemText>
                                </ActionsheetItem>
                                <ActionsheetItem onPress={() => handleOptionSelect('Section')}>
                                    <ActionsheetItemText color='$pixText100' fontWeight={selectedOption === 'Section' ? 'bold' : 'normal'}>Section</ActionsheetItemText>
                                </ActionsheetItem>
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