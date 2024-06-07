import React from 'react';
import { Box } from '@gluestack-ui/themed';
import Header from '../../components/Header';
import PeriodChip from '../../components/PeriodChip';
import TimeStamp from '../../components/TimeStamp';

const Timeline: React.FC = () => {
    return (
        <Box bg="$pixWhite" w="$full" h="$full" p="$4">
            <Header title="Good Morning" />
            <Box flexDirection='row' alignContent='center' pt="$2">
                <PeriodChip
                    label="1st Period"
                />
                <TimeStamp
                    startTime='10.00'
                    endTime='11.00'
                />
            </Box>
        </Box>
    );
};

export default Timeline;
