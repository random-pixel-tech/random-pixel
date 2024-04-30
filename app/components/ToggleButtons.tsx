import React from 'react';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';

interface ToggleButtonsProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  selectedButton: 'left' | 'right';
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  leftButtonLabel,
  rightButtonLabel,
  selectedButton,
  onLeftButtonClick,
  onRightButtonClick,
}) => {
  return (
    <Box flexDirection="row" alignContent="center" justifyContent="center" p="$4">
      <Button
        px="$9"
        onPress={onLeftButtonClick}
        borderTopLeftRadius="$full"
        borderBottomLeftRadius="$full"
        bg={selectedButton === 'left' ? '$pixSecondary2' : '$white'}
        variant={selectedButton === 'left' ? 'solid' : 'outline'}
      >
        <ButtonText color={selectedButton === 'left' ? '$white' : '$pixPrimaryDark50'} fontSize={12}>
          {leftButtonLabel}
        </ButtonText>
      </Button>
      <Button
        px="$9"
        onPress={onRightButtonClick}
        borderTopRightRadius="$full"
        borderBottomRightRadius="$full"
        bg={selectedButton === 'right' ? '$pixSecondary2' : '$white'}
        variant={selectedButton === 'right' ? 'solid' : 'outline'}
      >
        <ButtonText color={selectedButton === 'right' ? '$white' : '$pixPrimaryDark50'} fontSize={12}>
          {rightButtonLabel}
        </ButtonText>
      </Button>
    </Box>
  );
};

export default ToggleButtons;