import React, { useState } from 'react';
import { Box, VStack } from '@gluestack-ui/themed';
import Header from '../../../components/Header';
import SelectDropdown from '../../../components/SelectDropdown';
import InsightBox from '../../../components/InsightBox';

const GenerateReport = () => {
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const durationOptions = [
    { label: 'Jan (2024)', value: 'jan2024' },
    { label: 'Feb (2024)', value: 'feb2024' },
    { label: 'Mar (2024)', value: 'mar2024' },
    { label: 'Dec (2024)', value: 'dec2024' },
  ];

  const classOptions = [
    { label: '1 A', value: '1a' },
    { label: '1 B', value: '1b' },
  ];

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    // Perform any additional operations with the selected duration
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    // Perform any additional operations with the selected class
  };

  return (
    <Box bg="$pixSecondaryLight50" w="$full" h="$full">
      <Header title="Generate Attendance Report" />
      <VStack mt="$4" px="$4">
        <SelectDropdown
          label="Select Duration"
          options={durationOptions}
          defaultValue={durationOptions[0].value}
          onChange={handleDurationChange}
        />
        <SelectDropdown
          label="Select Class"
          options={classOptions}
          defaultValue={classOptions[0].value}
          onChange={handleClassChange}
        />
      </VStack>


<InsightBox
  state="Success"
  count={56}
  countLabel="Students"
  percentageText="< 75% in last 30 days"
  isSuccess
/>
    </Box>
  );
};

export default GenerateReport;