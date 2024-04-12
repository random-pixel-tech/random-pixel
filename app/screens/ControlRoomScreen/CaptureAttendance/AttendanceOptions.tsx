import React from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  VStack,
  HStack,
  Text,
  Pressable,
  Box,
} from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../../../services/utils/colors';
import { Divider } from '@gluestack-ui/themed';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface AttendanceOption {
  label: string;
  icon: IconProp;
  onPress: () => void;
}

interface AttendanceOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  student: {
    id: string;
    name: string;
    rollNumber: number | null;
  };
  options: AttendanceOption[];
}

const AttendanceOptions: React.FC<AttendanceOptionsProps> = ({
  isOpen,
  onClose,
  onOpen,
  student,
  options,
}) => {
  return (
    <>
      <Pressable justifyContent="center" w="$1/6" onPress={onOpen} aria-label="Open Options">
        <FontAwesomeIcon icon="ellipsis-vertical" size={20} />
      </Pressable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent bg="$pixSecondaryLight50" p="$2">
          <ModalHeader display="flex" justifyContent="flex-start" alignItems="center">
            <Box
              borderRadius="$full"
              borderWidth={2}
              borderColor="$pixPrimaryDark50"
              width={40}
              height={40}
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="$pixPrimaryDark50">{student.rollNumber}</Heading>
            </Box>
            <Heading color="$pixPrimaryDark50" px="$4">
              {student.name}
            </Heading>
          </ModalHeader>
          <Divider my="$2" bg="$pixSecondary2" />
          <ModalBody>
            <VStack>
              {options.map((option, index) => (
                <Pressable key={index} p="$2" onPress={option.onPress}>
                  <HStack py="$2">
                    <FontAwesomeIcon icon={option.icon} color={Colors.PrimaryDark50} size={20} />
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
    </>
  );
};

export default AttendanceOptions;