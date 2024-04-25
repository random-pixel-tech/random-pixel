import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AlertDialogFooter } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';

interface SuccessAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  heading: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isOpen,
  onClose,
  message,
  heading,
  onConfirm,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent bg='$pixSecondaryLight50'>
        <AlertDialogHeader>
          <Heading size="md">{heading}</Heading>
          <AlertDialogCloseButton p="$4">
            <FontAwesomeIcon icon="xmark" size={18} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody pb="$4">
          <Text size="md">{message}</Text>
        </AlertDialogBody>
        <AlertDialogFooter alignSelf='flex-end'>
          <Button onPress={onClose} mr="$4" variant="outline">
            <ButtonText color='$pixBackgroundLight700'>{cancelButtonText}</ButtonText>
          </Button>
          <Button onPress={onConfirm}>
            <ButtonText>{confirmButtonText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessAlert;