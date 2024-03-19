import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';

const ControlRoom: React.FC = () => {
  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Box
          bg="#EBEAFF"
          width="45%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={8}
        >
          <Text>Box 1</Text>
        </Box>
        <Box
          bg="#EBEAFF"
          width="45%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={8}
        >
          <Text>Box 2</Text>
        </Box>
        <Box
          bg="#EBEAFF"
          width="45%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={8}
        >
          <Text>Box 3</Text>
        </Box>
        <Box
          bg="#EBEAFF"
          width="45%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={8}
        >
          <Text>Box 4</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ControlRoom;
