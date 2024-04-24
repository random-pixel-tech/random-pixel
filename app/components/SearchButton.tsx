import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { Box } from '@gluestack-ui/themed';

interface SearchButtonProps {
  onPress: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress }) => {
  return (
    <Box p="$4">
      <Button
        onPress={onPress}
        variant="outline"
        w="$8"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
      >
        <FontAwesomeIcon icon="magnifying-glass" size={18} color={Colors.Primary} />
      </Button>
    </Box>
  );
};

export default SearchButton;