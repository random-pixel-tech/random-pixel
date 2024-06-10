import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import Header from '../../components/Header';
import PeriodChip from '../../components/PeriodChip';
import TimeStamp from '../../components/TimeStamp';
import TimelineBlock from '../../components/TimelineBlock';

const Timeline: React.FC = () => {
    return (
        <Box bg="$white" w="$full" h="$full" p="$4">
            <Header title="Good Morning" />
            <Box flexDirection='row' alignContent='center' pt="$2" pb="$1">
                <PeriodChip
                    label="1st Period"
                />
                <TimeStamp
                    startTime='10:00'
                    endTime='11:00'
                />
            </Box>
            <Box>
                <TimelineBlock
                    title='Attendance S1'
                />
                <TimelineBlock
                    title='Math'
                    description='V A'
                />
            </Box>
            <Text color='$pixPrimaryLight50' w="$16" textAlign='center'>
                ┆
            </Text>
        </Box>
    );
};

export default Timeline;
