import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  heading: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  heading,
  text,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="md">{heading}</Heading>
          <AlertDialogCloseButton>
            <FontAwesomeIcon icon="xmark" size={20} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody pb="$4">
          <Text size="md">{text}</Text>
        </AlertDialogBody>
        <AlertDialogFooter alignSelf='flex-end'>
          <Button onPress={onConfirm} variant="outline" mr="$4">
            <ButtonText>{confirmButtonText}</ButtonText>
          </Button>
          <Button onPress={onClose}  bg='$error500'>
            <ButtonText>{cancelButtonText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;