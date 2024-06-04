import React from 'react';
import { Box } from '@gluestack-ui/themed';
import Header from '../../../components/Header';

const GenerateReport = () => {

  return (
    <Box bg="$pixSecondaryLight50" w="$full" h="$full">
      <Header
        title="Generate Attendance Report"
        />
    </Box>
  );
};

export default GenerateReport;