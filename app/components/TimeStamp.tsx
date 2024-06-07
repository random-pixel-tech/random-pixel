import React from 'react';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface TimeStampProps {
    startTime: string;
    endTime: string;

}

const TimeStamp: React.FC<TimeStampProps> = ({ startTime, endTime }) => {
    return (
        <Box flexDirection='row' p="$2">
            <FontAwesomeIcon icon="clock" size={18}/>
            <Text px="$1">
                {startTime} to {endTime}
            </Text>
        </Box>
    );
};

export default TimeStamp;