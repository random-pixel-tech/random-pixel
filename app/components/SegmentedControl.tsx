import React from 'react';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';

interface SegmentedControlProps<TLeft, TRight> {
  leftButtonLabel: string;
  rightButtonLabel: string;
  selectedSegment: TLeft | TRight;
  onSegmentChange: (segment: TLeft | TRight) => void;
  leftSegmentValue: TLeft;
  rightSegmentValue: TRight;
}

const SegmentedControl = <TLeft, TRight>({
  leftButtonLabel,
  rightButtonLabel,
  selectedSegment,
  onSegmentChange,
  leftSegmentValue,
  rightSegmentValue,
}: SegmentedControlProps<TLeft, TRight>) => {
  return (
    <Box flexDirection="row" alignContent="center" justifyContent="center" p="$4">
      <Button
        px="$9"
        onPress={() => onSegmentChange(leftSegmentValue)}
        borderTopLeftRadius="$full"
        borderBottomLeftRadius="$full"
        bg={selectedSegment === leftSegmentValue ? '$pixSecondary2' : '$white'}
        variant={selectedSegment === leftSegmentValue ? 'solid' : 'outline'}
      >
        <ButtonText
          color={selectedSegment === leftSegmentValue ? '$white' : '$pixPrimaryDark50'}
          fontSize={12}
        >
          {leftButtonLabel}
        </ButtonText>
      </Button>
      <Button
        px="$9"
        onPress={() => onSegmentChange(rightSegmentValue)}
        borderTopRightRadius="$full"
        borderBottomRightRadius="$full"
        bg={selectedSegment === rightSegmentValue ? '$pixSecondary2' : '$white'}
        variant={selectedSegment === rightSegmentValue ? 'solid' : 'outline'}
      >
        <ButtonText
          color={selectedSegment === rightSegmentValue ? '$white' : '$pixPrimaryDark50'}
          fontSize={12}
        >
          {rightButtonLabel}
        </ButtonText>
      </Button>
    </Box>
  );
};

export default SegmentedControl;