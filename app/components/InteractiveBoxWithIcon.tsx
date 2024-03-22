import React from 'react';
import { Pressable, Box, Center, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


interface InteractiveBoxWithIconProps {
  onPress?: () => void;
  title: string;
}

const InteractiveBoxWithIcon: React.FC<InteractiveBoxWithIconProps> = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        bg="$pixSecondaryLight50"
        aspectRatio={1}
        rounded='$lg'
        p='$4'
        m='$4'
        $sm-w='$32'
        $md-w='$40'
      >
        <Center height="100%" justifyContent="space-evenly">
          <FontAwesomeIcon icon="paperclip" size={40}/>
          <Text>{title}</Text>
        </Center>
      </Box>
    </Pressable>
  );
};

export default InteractiveBoxWithIcon;
