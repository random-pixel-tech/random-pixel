import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { Box } from '@gluestack-ui/themed';

const SearchButton: React.FC = () => {
  return (
    <Box p="$4">
    <Button
      onPress={() => console.log('button clicked')}
      variant="outline"
      borderColor="$pixPrimary"
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
