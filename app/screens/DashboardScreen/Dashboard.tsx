import React from 'react';
import ClassButton from './ClassButton';
import { Box } from '@gluestack-ui/themed';

const Dashboard: React.FC = () => {
  return (
    <Box display='flex' flexDirection='row' flexWrap='wrap'>
      {[...Array(10)].map((_, index) => (
        <ClassButton key={index} classNumber={index + 1} />
      ))}
    </Box>
  );
};

export default Dashboard;