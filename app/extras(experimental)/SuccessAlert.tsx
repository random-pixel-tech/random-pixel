import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  PRIMARY,
  SECONDARY_LIGHT_50,
  STATUS_ERROR,
} from "../theme/color-tokens";

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
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialogContent}>
          <View style={styles.header}>
            <Text style={styles.heading}>{heading}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <FontAwesomeIcon icon="xmark" size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>{message}</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>
                {cancelButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.buttonText}>
                {confirmButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContent: {
    width: "80%",
    backgroundColor: SECONDARY_LIGHT_50,
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  body: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: PRIMARY,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: STATUS_ERROR,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SuccessAlert;
