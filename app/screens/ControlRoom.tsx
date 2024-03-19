import React from 'react';
import { Box, Center, Text } from '@gluestack-ui/themed';
import { Entypo } from '@expo/vector-icons';

const ControlRoom: React.FC = () => {
  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Box
          bg="#EBEAFF"
          width="35%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={16}
        >
          <Center height="100%" justifyContent="space-evenly">
            <Entypo name="attachment" size={56} />
            <Text>Attendance</Text>
          </Center>
        </Box>
        <Box
          bg="#EBEAFF"
          width="35%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={16}
        >
          <Center height="100%" justifyContent="space-evenly">
            <Entypo name="attachment" size={56} />
            <Text>Attendance</Text>
          </Center>
        </Box>
        <Box
          bg="#EBEAFF"
          width="35%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={16}
        >
          <Center height="100%" justifyContent="space-evenly">
            <Entypo name="attachment" size={56} />
            <Text>Attendance</Text>
          </Center>
        </Box>
        <Box
          bg="#EBEAFF"
          width="35%"
          aspectRatio={1}
          borderRadius={8}
          p={16}
          m={16}
        >
          <Center height="100%" justifyContent="space-evenly">
            <Entypo name="attachment" size={56} />
            <Text>Attendance</Text>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default ControlRoom;
