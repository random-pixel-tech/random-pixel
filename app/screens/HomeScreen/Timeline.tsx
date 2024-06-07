import React from 'react';
import { Box } from '@gluestack-ui/themed';
import Header from '../../components/Header';
import PeriodChip from '../../components/PeriodChip';

const Timeline: React.FC = () => {
    return (
        <Box bg="$pixSecondaryLight50" w="$full" h="$full">
            <Header title="Good Morning" />
            <Box>
            <PeriodChip
             label="1st Period"
            />
            </Box>
        </Box>
    );
};

export default Timeline;
