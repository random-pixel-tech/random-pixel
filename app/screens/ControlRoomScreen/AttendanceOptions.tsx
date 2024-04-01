import React from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  VStack,
  HStack,
  Text,
  Pressable,
} from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { CloseIcon } from '@gluestack-ui/themed';

interface AttendanceOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  student: {
    id: string;
    name: string;
    roll_number: number | null;
  };
  onLeaveClick: (studentId: string) => void;
}

const AttendanceOptions: React.FC<AttendanceOptionsProps> = ({
  isOpen,
  onClose,
  onOpen,
  student,
  onLeaveClick,
}) => {
  return (
    <>
      <Pressable justifyContent="center" w="$1/6" onPress={onOpen} aria-label="Open Options">
        <FontAwesomeIcon icon="ellipsis-vertical" size={20} />
      </Pressable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent bg="$pixSecondaryLight50" p="$2">
          <ModalHeader display="flex" justifyContent="space-between">
            <Heading color="$pixPrimary">{student.name}</Heading>
            <Heading color="$pixPrimary">{student.roll_number}</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack>
            <Pressable p="$2" onPress={() => { onLeaveClick(student.id); onClose(); }}>
                <HStack>
                  <FontAwesomeIcon icon="plane-departure" color="#5f31dd" size={20} />
                  <Text color="$pixPrimaryDark50" px="$4">
                    On leave
                  </Text>
                </HStack>
              </Pressable>
              <HStack p="$2">
                <FontAwesomeIcon icon="address-card" color="#5f31dd" size={20} />
                <Text color="$pixPrimaryDark50" px="$4">
                  View student profile
                </Text>
              </HStack>
              <HStack p="$2">
                <FontAwesomeIcon icon="calendar-check" color="#5f31dd" size={20} />
                <Text color="$pixPrimaryDark50" px="$4">
                  Mark attendance for upcoming days
                </Text>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttendanceOptions;