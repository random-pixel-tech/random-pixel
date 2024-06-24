import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Colors } from "../../../../../services/utils/colors";
import { SECONDARY_LIGHT_50 } from "../../../../../theme/color-tokens";

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
    scholar_id: string;
    student_name: string;
    roll_number: number | null;
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
  console.log(isOpen);
  return (
    <>
      <Pressable onPress={onOpen} style={styles.pressable}>
        <FontAwesomeIcon size={24} icon="ellipsis-vertical" />
      </Pressable>
      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.avatar}>
                <Text style={styles.rollNumber}>
                  {student.roll_number}
                </Text>
              </View>
              <Text style={styles.studentName}>
                {student.student_name}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.modalBody}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={option.onPress}
                  style={styles.option}
                >
                  <View style={styles.optionContent}>
                    <FontAwesomeIcon
                      icon={option.icon}
                      color={Colors.PrimaryDark50}
                      size={20}
                    />
                    <Text style={styles.optionText}>
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: SECONDARY_LIGHT_50,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.PrimaryDark50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rollNumber: {
    color: Colors.PrimaryDark50,
    fontWeight: "bold",
  },
  studentName: {
    marginLeft: 16,
    color: Colors.PrimaryDark50,
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.Secondary2,
    marginVertical: 10,
  },
  modalBody: {
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 16,
    color: Colors.PrimaryDark50,
    fontSize: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.PrimaryDark50,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AttendanceOptions;
