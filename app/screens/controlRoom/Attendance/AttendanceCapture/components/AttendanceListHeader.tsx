import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StyleSheet, View, Text } from "react-native";
import {
  SECONDARY_LIGHT_50,
  TEXT_DARK_100,
} from "../../../../../theme/color-tokens";

interface AttendanceListHeaderProps {
  FirstColumnText?: string;
  SecondColumnText?: string;
  ThirdColumnText?: string;
  FourthColumnText?: string;
  icon?: IconProp;
}

const AttendanceListHeader: React.FC<AttendanceListHeaderProps> = ({
  FirstColumnText,
  SecondColumnText,
  ThirdColumnText,
  FourthColumnText,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { width: 48 }]}>
        {FirstColumnText}
      </Text>
      <Text style={[styles.headerText, { width: 172 }]}>
        {SecondColumnText}
      </Text>
      <View style={styles.statusHeaderContainer}>
        <Text style={[styles.headerText, styles.statusHeaderText]}>
          {ThirdColumnText}
        </Text>
        <Text style={[styles.headerText, styles.statusHeaderText]}>
          {FourthColumnText}
        </Text>
        <View style={[styles.statusHeaderText]}>
          {icon && <FontAwesomeIcon icon={icon} size={24} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SECONDARY_LIGHT_50,
    paddingHorizontal: 16,
  },
  statusHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  statusHeaderText: {
    flex: 1,
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_DARK_100,
  },
});

export default React.memo(AttendanceListHeader);
