import React from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalBody, VStack, HStack, Pressable, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Option {
  label: string;
  icon?: IconProp;
  onPress: () => void;
}

interface OptionsMenuProps {
  options: Option[];
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ options, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bg="$pixSecondaryLight50" p="$2">
        <ModalBody>
          <VStack>
            {options.map((option, index) => (
              <Pressable key={index} p="$2" onPress={option.onPress}>
                <HStack py="$2" alignItems="center">
                  {option.icon && (
                    <FontAwesomeIcon icon={option.icon} color={Colors.PrimaryDark50} size={20} />
                  )}
                  <Text color="$pixPrimaryDark50" px="$4">
                    {option.label}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OptionsMenu;