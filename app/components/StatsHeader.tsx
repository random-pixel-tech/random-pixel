import React from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import OptionsMenu from './OptionsMenu';
import dayjs from 'dayjs';

interface StatsHeaderProps {
  title: string;
  selectedDuration: string;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  handleOptionSelect: (optionId: string) => void;
  isOptionsMenuOpen: boolean;
  handleRangeOptionsMenuOpen: () => void;
  handleRangeOptionsMenuClose: () => void;
  currentDate: any;
  startDate: string;
  endDate: string;
  showDatePicker: boolean;
  isNextDisabled: boolean;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({
  title,
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
  isNextDisabled
}) => {
  const navigation = useNavigation();

  const options = [
    { id: 'daily', label: 'Daily', onPress: () => handleOptionSelect('daily') },
    { id: 'weekly', label: 'Weekly', onPress: () => handleOptionSelect('weekly') },
    { id: 'monthly', label: 'Monthly', onPress: () => handleOptionSelect('monthly') },
    { id: 'yearly', label: 'Yearly', onPress: () => handleOptionSelect('yearly') },
    { id: 'customRange', label: 'Custom Date Range', onPress: () => handleOptionSelect('customRange') },
  ];

  const formatDate = (date: string) => {
    return dayjs(date).format('DD, MMM - YYYY');
  };

  return (
    <Box
      bg="$pixSecondaryLight50"
      w="$full"
      h="$28"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$4"
      pt="$8"
      pb="$2"
      borderBottomWidth={2}
      borderBottomColor={Colors.SecondaryLight100}
    >
      <Pressable onPress={() => navigation.goBack()} p="$4">
        <FontAwesomeIcon icon="arrow-left" size={18} color={Colors.Text100} />
      </Pressable>
      <Box display="flex" flexDirection="column" alignItems="center" minWidth="$48">
        <Text color={Colors.Text100} fontSize="$md" fontWeight="$medium" mb="$2">
          {title}
        </Text>
        <Box display="flex" flexDirection="row" alignItems="center">
          {selectedDuration !== 'customRange' && (
            <Pressable onPress={handlePrevDay} p="$4">
              <FontAwesomeIcon icon="arrow-left" size={16} color={Colors.Primary} />
            </Pressable>
          )}
          <Text px="$2">
            {selectedDuration === 'customRange'
              ? showDatePicker
                ? "Start Date to End Date"
                : `${formatDate(startDate)} to ${formatDate(endDate)}`
              : selectedDuration === 'monthly'
                ? currentDate.format('MMM - YYYY')
                : selectedDuration === 'yearly'
                  ? currentDate.format('YYYY')
                  : selectedDuration === 'weekly'
                    ? `Week ${currentDate.week() - currentDate.startOf('month').week() + 1}, ${currentDate.format('MMM - YYYY')}`
                    : currentDate.format('DD, MMM - YYYY')}
          </Text>
          {selectedDuration !== 'customRange' && (
            <Pressable onPress={handleNextDay} p="$4" disabled={isNextDisabled}
            opacity={isNextDisabled ? 0.5 : 1}
        >
              <FontAwesomeIcon icon="arrow-right" size={16} color={Colors.Primary} />
            </Pressable>
          )}
        </Box>

      </Box>
        <Pressable onPress={handleRangeOptionsMenuOpen} p="$4" display="flex" flexDirection="column" alignItems="center" minWidth="$16">
          <FontAwesomeIcon icon={faCalendarAlt} size={18} color={Colors.Primary} />
          <Text color={Colors.Text100} mt="$1">
          {selectedDuration === 'customRange'
            ? 'Custom'
            : options.find((option) => option.id === selectedDuration)?.label || 'Daily'}
        </Text>
        </Pressable>
        
      <OptionsMenu options={options} isOpen={isOptionsMenuOpen} onClose={handleRangeOptionsMenuClose} />
    </Box>
  );
};

export default StatsHeader;