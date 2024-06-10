import React from 'react';
import { Box, Center, Divider, Text } from '@gluestack-ui/themed';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface InsightRectProps {
    labelType: 'warn' | 'info' | 'error' | 'success';
    labelText: string;
    timeDuration: string;
    benchmark: string;
    icon: IconProp
}

const InsightRect: React.FC<InsightRectProps> = ({
    labelType,
    labelText,
    timeDuration,
    benchmark,
    icon,
}) => {
    const getLabelColor = () => {
        switch (labelType) {
            case 'warn':
                return Colors.Warning400;
            case 'info':
                return Colors.Info400;
            case 'error':
                return Colors.Error400;
            case 'success':
                return Colors.Success400;
            default:
                return Colors.Text100;
        }
    };

    const getLabelBgColor = () => {
        switch (labelType) {
            case 'warn':
                return Colors.Warning50;
            case 'info':
                return Colors.Info50;
            case 'error':
                return Colors.Error50;
            case 'success':
                return Colors.Success50;
            default:
                return Colors.White;
        }
    };

    return (
        <Box
            bg={getLabelBgColor()}
            p="$4"
            m="$4"
            w="$full"
            hardShadow="1"
            borderLeftWidth="$4"
            borderLeftColor={getLabelColor()}
        >
            <Center flexDirection="column" justifyContent="space-between" height="100%" alignContent='space-between'>
                <Box alignSelf='flex-start' flexDirection='row' alignContent='center' pb="$4">
                    <FontAwesomeIcon icon={icon} size={12} color={getLabelColor()} />
                    <Text color={getLabelColor()} fontSize="$xs" pl="$1">
                        {labelText}
                    </Text>
                </Box>
                <Text fontSize="$xs" alignSelf='flex-start'>
                    {benchmark} in {timeDuration}
                </Text>
            </Center>
        </Box>
    );
};

export default InsightRect;