import React from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import OptionsMenu from './OptionsMenu';

interface StatsHeaderProps {
  title: string;
  selectedOption: string;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  handleOptionSelect: (optionId: string) => void;
  isOptionsMenuOpen: boolean;
  handleOptionsMenuOpen: () => void;
  handleOptionsMenuClose: () => void;
  currentDate: any;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({
  title,
  selectedOption,
  handlePrevDay,
  handleNextDay,
  handleOptionSelect,
  isOptionsMenuOpen,
  handleOptionsMenuOpen,
  handleOptionsMenuClose,
  currentDate,
}) => {
  const navigation = useNavigation();

  const options = [
    { id: 'daily', label: 'Daily', onPress: () => handleOptionSelect('daily') },
    { id: 'weekly', label: 'Weekly', onPress: () => handleOptionSelect('weekly') },
    { id: 'monthly', label: 'Monthly', onPress: () => handleOptionSelect('monthly') },
    { id: 'yearly', label: 'Yearly', onPress: () => handleOptionSelect('yearly') },
    { id: 'customRange', label: 'Custom Date Range', onPress: () => handleOptionSelect('customRange') },
  ];

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
      <Pressable onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon="arrow-left" size={20} color={Colors.Text100} />
      </Pressable>
      <Box display="flex" flexDirection="column" alignItems="center" minWidth="$48">
        <Text color={Colors.Text100} fontSize="$md" fontWeight="$medium" mb="$2">
          {title}
        </Text>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Pressable onPress={handlePrevDay}>
            <FontAwesomeIcon icon="arrow-left" size={16} color={Colors.Primary} />
          </Pressable>
          <Text px="$2">
            {selectedOption === 'monthly'
              ? currentDate.format('MMM - YYYY')
              : selectedOption === 'yearly'
              ? currentDate.format('YYYY')
              : selectedOption === 'weekly'
              ? `Week ${currentDate.week() - currentDate.startOf('month').week() + 1}, ${currentDate.format('MMM - YYYY')}`
              : currentDate.format('DD, MMM - YYYY')}
          </Text>
          <Pressable onPress={handleNextDay}>
            <FontAwesomeIcon icon="arrow-right" size={16} color={Colors.Primary} />
          </Pressable>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" minWidth="$16">
        <Pressable onPress={handleOptionsMenuOpen}>
          <FontAwesomeIcon icon={faCalendarAlt} size={20} color={Colors.Primary} />
        </Pressable>
        <Text color={Colors.Text100} mt="$1">
          {selectedOption === 'customRange'
            ? 'Custom'
            : options.find((option) => option.id === selectedOption)?.label || 'Daily'}
        </Text>
      </Box>
      <OptionsMenu options={options} isOpen={isOptionsMenuOpen} onClose={handleOptionsMenuClose} />
    </Box>
  );
};

export default StatsHeader;
