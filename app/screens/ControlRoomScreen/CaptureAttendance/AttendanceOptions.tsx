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

interface AttendanceOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  student: {
    id: string;
    name: string;
    rollNumber: number | null;
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
            <Heading color="$pixPrimaryDark50" px='$4'>{student.name}</Heading>
          </ModalHeader>
          <Divider my="$2" bg="$pixSecondary2" />
          <ModalBody>
            <VStack>
              <Pressable
                p="$2"
                onPress={() => {
                  onLeaveClick(student.id);
                  onClose();
                }}
              >
                <HStack py='$2'>
                  <FontAwesomeIcon icon="plane-departure" color={Colors.PrimaryDark50} size={20} />
                  <Text color="$pixPrimaryDark50" px="$4">
                    On leave
                  </Text>
                </HStack>
              </Pressable>
              <HStack py='$4' p="$2">
                <FontAwesomeIcon icon="address-card" color={Colors.PrimaryDark50} size={20} />
                <Text color="$pixPrimaryDark50" px="$4">
                  View student profile
                </Text>
              </HStack>
              <HStack py='$4' p="$2">
                <FontAwesomeIcon icon="calendar-check" color={Colors.PrimaryDark50} size={20} />
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