import React, { useState } from 'react';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';

interface ToggleButtonsProps {
    leftButtonLabel: string;
    rightButtonLabel: string;
    onLeftButtonClick: () => void;
    onRightButtonClick: () => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
    leftButtonLabel,
    rightButtonLabel,
    onLeftButtonClick,
    onRightButtonClick,
}) => {
    const [selectedButton, setSelectedButton] = useState('left');

    const handleLeftButtonClick = () => {
        setSelectedButton('left');
        onLeftButtonClick();
    };

    const handleRightButtonClick = () => {
        setSelectedButton('right');
        onRightButtonClick();
    };

    return (
        <Box flexDirection="row" alignContent='center' justifyContent='center' p="$4">
            <Button
                px="$9"
                onPress={handleLeftButtonClick}
                borderTopLeftRadius="$full"
                borderBottomLeftRadius="$full"
                bg={selectedButton === 'left' ? '$pixSecondary2' : 'white'}
                variant={selectedButton === 'left' ? 'solid' : 'outline'}
            >
                <ButtonText color={selectedButton === 'left' ? 'white' : '$pixPrimaryDark50'}
                    fontSize={12}>{leftButtonLabel}</ButtonText>
            </Button>
            <Button
                px="$9"
                onPress={handleRightButtonClick}
                borderTopRightRadius="$full"
                borderBottomRightRadius="$full"
                bg={selectedButton === 'right' ? '$pixSecondary2' : 'white'}
                variant={selectedButton === 'right' ? 'solid' : 'outline'}
            >
                <ButtonText color={selectedButton === 'right' ? 'white' : '$pixPrimaryDark50'}
                    fontSize={12}>{rightButtonLabel}</ButtonText>
            </Button>
        </Box>
    );
};

export default ToggleButtons;
