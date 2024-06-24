import React, { useContext } from "react";
import { Box, Input, InputField } from "@gluestack-ui/themed";
import AttendanceFilterPanel from "./AttendanceFilterPanel";
import SegmentedControl from "../../../components/SegmentedControl";
import SearchButton from "../../../components/SearchButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "../../../services/utils/colors";
import { Pressable } from "@gluestack-ui/themed";
import { Segment } from "../../../services/utils/enums";
import { AttendanceStatsContext } from "../../../providers/attendanceStatsProvider";

const StatsSearchAndFilterBar = () => {
  const {
    selectedSegment,
    handleSegmentChange,
    searchQuery,
    showSearchInput,
    handleSearchButtonClick,
    handleSearchInputChange,
    handleClearSearch,
    searchButtonPress,
    isLoading,
  } = useContext(AttendanceStatsContext) ?? {};

  return (
    <Box
      opacity={isLoading ? 0.5 : 1}
      pointerEvents={isLoading ? "none" : "auto"}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <AttendanceFilterPanel isLoading={isLoading} />
        <SegmentedControl
          leftButtonLabel="Classes"
          rightButtonLabel="Students"
          selectedSegment={selectedSegment}
          onSegmentChange={handleSegmentChange}
          leftSegmentValue={Segment.ClassSegment}
          rightSegmentValue={Segment.StudentSegment}
          isLoading={isLoading}
        />
        <SearchButton
          onPress={handleSearchButtonClick}
          searchButtonPress={searchButtonPress}
          selectedSegment={selectedSegment}
          isLoading={isLoading}
        />
      </Box>
      {showSearchInput && (
        <Box
          mt="$2"
          display="flex"
          flexDirection="row"
          alignItems="center"
          px="$4"
        >
          <Input variant="underlined" flex={1}>
            <InputField
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              placeholder={
                selectedSegment === Segment.ClassSegment
                  ? "Search for class name"
                  : "Search for student name"
              }
            />
          </Input>
          <Pressable ml="$2" onPress={handleClearSearch}>
            <FontAwesomeIcon
              icon="xmark"
              size={18}
              color={Colors.Primary}
            />
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

export default StatsSearchAndFilterBar;
