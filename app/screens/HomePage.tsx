import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import FilterAttendance from '../components/FilterAttendance';

const Home: React.FC = () => {
  return (
    <Box h="100%">
      <Text>Home Screen</Text>
      <FilterAttendance/>
    </Box>
  );
};

export default Home;
