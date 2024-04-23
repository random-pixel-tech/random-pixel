import React from 'react';
import { Box, Heading, Text } from '@gluestack-ui/themed';
import { AttendanceSession } from '../../../services/utils/enums';

interface SummaryValues {
  [key: string]: number;
}

interface AttendanceHeaderProps {
  className: string;
  section: string;
  today: string;
  summaryValues: SummaryValues;
  session: AttendanceSession;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  className,
  section,
  today,
  summaryValues,
  session
}) => {
  const summaryKeys = Object.keys(summaryValues);

  return (
    <Box
      bg="$pixSecondary"
      w="$full"
      h="$16"
      alignContent="center"
      p="$1"
      px="$4"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Box>
        <Heading fontSize="$lg">
          Class: {className} {section}
        </Heading>
        <Text fontSize="$md">{today} | {session === AttendanceSession.Morning ? 'Session one' : 'Session two'}</Text>
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