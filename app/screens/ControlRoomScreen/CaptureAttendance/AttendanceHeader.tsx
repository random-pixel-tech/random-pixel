import React from 'react';
import { Box, Heading, Text } from '@gluestack-ui/themed';

interface SummaryValues {
  [key: string]: number;
}

interface AttendanceHeaderProps {
  className: string;
  today: string;
  summaryValues: SummaryValues;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({ className, today, summaryValues }) => {
  const summaryKeys = Object.keys(summaryValues);

  return (
    <Box bg="$pixSecondary" w="$full" h="$16" alignContent="center" p="$1" justifyContent="space-between" flexDirection="row">
      <Box>
        <Heading fontSize="$lg">{className}</Heading>
        <Text fontSize="$md">{today}</Text>
      </Box>
      <Box>
        <Heading fontSize="$lg" alignSelf="flex-end">
          {summaryKeys.map((key, index) => (
            <React.Fragment key={key}>
              {summaryValues[key]}
              {index < summaryKeys.length - 1 && '/'}
            </React.Fragment>
          ))}
        </Heading>
        <Text fontSize="$md">Summary</Text>
      </Box>
    </Box>
  );
};

export default AttendanceHeader;