import React from 'react';
import { Button, CheckboxIcon, CheckIcon, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, Box, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ButtonText, Checkbox, CheckboxIndicator, ScrollView, ActionsheetScrollView } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface FilterAttendanceProps {
    showActionsheet: boolean;
    selectedTab: string;
    selectedFilters: Record<string, string[]>;
    selectedFilterOption: string;
    onClose: () => void;
    onTabSelect: (option: string) => void;
    onCategorySelect: (option: string) => void;
    handleOpenFilterActionsheet: () => void;
    onFilterOptionSelect: (category: string, option: string) => void;
    onSortOptionSelect: (option: string) => void;
    onClear: () => void;
    onApply: () => void;
    sortOption: string;
    isClassOptionSelected: boolean;
    filterButtonPress: boolean;
    selectedButton: 'left' | 'right';
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
    handleOpenFilterActionsheet,
    onFilterOptionSelect,
    onSortOptionSelect,
    onClear,
    onApply,
    sortOption,
    onCategorySelect,
    isClassOptionSelected,
    filterButtonPress,
    selectedButton,
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
                    <ActionsheetItem key={option.value} onPress={() => onFilterOptionSelect(category, option.value)} p="$0">
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

    const renderAttendanceOptions = () => {
        const options: FilterOption[] = [
          { label: '50% or below', value: '50% or below' },
          { label: '50% to 70%', value: '50% to 70%' },
          { label: 'Above 70%', value: 'Above 70%' },
        ];
    
        return renderFilterOptions(options, 'attendance');
      };


      const renderClassOptions = () => renderFilterOptions(
        Array.from({ length: 10 }, (_, index) => ({
          label: `Class ${index + 1}`,
          value: `${index + 1}`
        })),
        'class'
      );

    const renderSectionsOptions = () => renderFilterOptions([
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' }
    ], 'section');


    // Render sort options with icons
    const renderSortOptions = (options: { label: string, icon: IconProp }[]) => {
        return options.map(option => (
            <ActionsheetItem key={option.label} onPress={() => onSortOptionSelect(option.label)}>
                <Box flexDirection="row" alignItems="center">
                <FontAwesomeIcon icon={option.icon} size={sortOption === option.label ? 28 : 24} color={Colors.Primary} />
                    <ActionsheetItemText color="$pixText100" fontWeight={sortOption === option.label ? 'bold' : 'normal'}>
                        {option.label}
                    </ActionsheetItemText>                
                    </Box>
            </ActionsheetItem>
        ));
    };


    const renderAvailableOptions = () => {
        if (selectedTab === 'Filter') {
          if (selectedButton === 'left') {
            return renderAttendanceOptions();
          } else {
            switch (selectedFilterOption) {
              case 'Attendance Percentage':
                return renderAttendanceOptions();
              case 'Class':
                return renderClassOptions();
              case 'Section':
                return renderSectionsOptions();
              default:
                return null;
            }
          }
        } else if (selectedTab === 'Sort') {
          let sortOptions: {
            label: string;
            icon: IconProp;
          }[] = [];
      
          if (selectedButton === 'left') {
            sortOptions = [
              { label: 'Attendance Percentage: Low to High', icon: 'person-arrow-down-to-line' },
              { label: 'Attendance Percentage: High to Low', icon: 'person-arrow-up-from-line' },
              { label: 'Class: Low to High', icon: 'arrow-up-1-9' },
              { label: 'Class: High to Low', icon: 'arrow-up-9-1' },
            ];
          } else {
            sortOptions = [
              { label: 'Attendance Percentage: Low to High', icon: 'person-arrow-down-to-line' },
              { label: 'Attendance Percentage: High to Low', icon: 'person-arrow-up-from-line' },
              { label: 'Name: A to Z', icon: 'arrow-up-a-z' },
              { label: 'Name: Z to A', icon: 'arrow-up-z-a' },
              { label: 'Class: Low to High', icon: 'arrow-up-1-9' },
              { label: 'Class: High to Low', icon: 'arrow-up-9-1' },
            ];
          }
      
          return renderSortOptions(sortOptions);
        }
        return null;
      };

    const renderFilterOptionsSidebar = () => {
        let options: FilterOption[] = [
          { label: 'Attendance Percentage', value: 'Attendance Percentage' },
        ];
    
        if (selectedButton === 'right') {
          options = [
            { label: 'Attendance Percentage', value: 'Attendance Percentage' },
            { label: 'Class', value: 'Class' },
          ];
    
          if (isClassOptionSelected) {
            options.push({ label: 'Section', value: 'Section' });
          }
        }

        return options.map(option => (
            <ActionsheetItem key={option.value} onPress={() => onCategorySelect(option.value)}>
              <ActionsheetItemText color='$pixText100' fontWeight={selectedFilterOption === option.value ? 'bold' : 'normal'}>
                {option.label}
              </ActionsheetItemText>
            </ActionsheetItem>
          ));
        };

    return (
        <Box p="$4">
            <Button onPress={() => handleOpenFilterActionsheet()} variant="outline" w="$8" flexDirection='column' alignContent='center' justifyContent='center'
            bg={filterButtonPress ? "$pixSecondary2" : "transparent"}
            borderColor={filterButtonPress ? "$pixSecondary2" : "$pixPrimary"}
            >
                <FontAwesomeIcon icon="filter" size={18} color={filterButtonPress ? "white" : Colors.Primary} />
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
                            <Box flexDirection="row" style={{ flex: 1 }} w="$full">
                                <Box w="$1/3" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                    {renderFilterOptionsSidebar()}
                                </Box>
                                <Box w="$2/3" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                    {renderAvailableOptions()}
                                </Box>
                            </Box>
                        )}
                        {selectedTab === 'Sort' && (
                            <Box flexDirection="row" style={{ flex: 1 }} w="$full">
                                <Box w="$full" borderRightWidth={1} borderRightColor='$pixPrimaryLight100' h="$full">
                                    {renderAvailableOptions()}
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
        </Box>
    );
};

export default FilterAttendance;