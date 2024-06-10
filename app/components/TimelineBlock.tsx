import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface TimelineBlockProps {
    title: string;
    description?: string;
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({ title, description }) => {
    return (
        <Box>
        <Box flexDirection='row' mb="$1" p="$2" bg="$pixSecondaryLight50" rounded="$sm" alignItems='center' justifyContent='space-around'>
            <FontAwesomeIcon icon="circle-xmark" size={16} />
            <Box px="$2" w="$1/2">
                <Text color='$pixPrimaryDark50' fontSize="$md">
                    {title}
                </Text>
                {description && (
                    <Text mt="$1" fontSize="$xs">
                        {description}
                    </Text>
                )}
            </Box>
            <FontAwesomeIcon icon="chevron-right" size={16} />
        </Box>
        </Box>
    );
};

export default TimelineBlock;
