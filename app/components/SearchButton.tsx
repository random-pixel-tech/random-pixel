import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { Box } from '@gluestack-ui/themed';

interface SearchButtonProps {
  onPress: () => void;
  searchButtonPress: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress, searchButtonPress }) => {
  return (
    <Box p="$4">
      <Button
        onPress={onPress}
        variant="outline"
        w="$8"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        bg={searchButtonPress ? "$pixSecondary2" : "transparent"}
        borderColor={searchButtonPress ? "$pixSecondary2" : "$pixPrimary"}
      >
        <FontAwesomeIcon icon="magnifying-glass" size={18} 
        color={searchButtonPress ? "white" : Colors.Primary}
         />
      </Button>
    </Box>
  );
};

export default SearchButton;