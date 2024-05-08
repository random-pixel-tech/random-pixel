import React from 'react';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Segment } from '../services/utils/enums';

interface SegmentedControlProps {
  leftButtonLabel: string;
  rightButtonLabel: string;
  selectedSegment: Segment;
  onSegmentChange: (segment: Segment) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  leftButtonLabel,
  rightButtonLabel,
  selectedSegment,
  onSegmentChange,
}) => {
  return (
    <Box flexDirection="row" alignContent="center" justifyContent="center" p="$4">
      <Button
        px="$9"
        onPress={() => onSegmentChange(Segment.ClassSegment)}
        borderTopLeftRadius="$full"
        borderBottomLeftRadius="$full"
        bg={selectedSegment === Segment.ClassSegment ? '$pixSecondary2' : '$white'}
        variant={selectedSegment === Segment.ClassSegment ? 'solid' : 'outline'}
      >
        <ButtonText
          color={selectedSegment === Segment.ClassSegment ? '$white' : '$pixPrimaryDark50'}
          fontSize={12}
        >
          {leftButtonLabel}
        </ButtonText>
      </Button>
      <Button
        px="$9"
        onPress={() => onSegmentChange(Segment.StudentSegment)}
        borderTopRightRadius="$full"
        borderBottomRightRadius="$full"
        bg={selectedSegment === Segment.StudentSegment ? '$pixSecondary2' : '$white'}
        variant={selectedSegment === Segment.StudentSegment ? 'solid' : 'outline'}
      >
        <ButtonText
          color={selectedSegment === Segment.StudentSegment ? '$white' : '$pixPrimaryDark50'}
          fontSize={12}
        >
          {rightButtonLabel}
        </ButtonText>
      </Button>
    </Box>
  );
};

export default SegmentedControl;