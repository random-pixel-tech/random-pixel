import React from "react";
import { Box } from "@gluestack-ui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StyleSheet, View, Text } from "react-native";
import { SECONDARY_LIGHT_50 } from "../../../../../theme/color-tokens";

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
      <Box
        display="flex"
        justifyContent="space-between"
        flex={1}
        alignItems="center"
        flexDirection="row"
      >
        <Text style={[styles.headerText, { flex: 1, padding: 12 }]}>
          {ThirdColumnText}
        </Text>
        <Text style={[styles.headerText, { flex: 1, padding: 12 }]}>
          {FourthColumnText}
        </Text>
        <Box display="flex" alignItems="center" flex={1} padding={12}>
          {icon && <FontAwesomeIcon icon={icon} size={24} />}
        </Box>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: SECONDARY_LIGHT_50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
});

export default React.memo(AttendanceListHeader);
