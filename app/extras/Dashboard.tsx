import React from 'react';
import ClassButton from './ClassButton';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { RouteNames } from '../services/utils/RouteNames';
import { useHandleNavigateToScreen } from '../services/utils/navigationUtils';

const Dashboard: React.FC = () => {
  const { handleDashboardNavigation } = useHandleNavigateToScreen([], () => {});

  return (
    <Box>
      <Button onPress={() => handleDashboardNavigation(RouteNames.AttendanceStats)}>
        <ButtonText>Attendance Stats</ButtonText>
      </Button>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {[...Array(10)].map((_, index) => (
          <ClassButton key={index} classNumber={index + 1} />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;