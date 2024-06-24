import React, { useContext } from "react";
import { Box, Text, Pressable } from "@gluestack-ui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../services/utils/colors";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "../../../components/OptionsMenu";
import dayjs from "dayjs";
import { SelectedDuration } from "../../../services/utils/enums";
import BackArrowButton from "../../../components/BackArrowButton";
import DatePicker from "../../../components/DatePicker";
import { AttendanceStatsContext } from "../../../providers/attendanceStatsProvider";

interface StatsHeaderProps {
  title: string;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const {
    selectedDuration,
    handlePrevDay,
    handleNextDay,
    handleOptionSelect,
    isOptionsMenuOpen,
    handleRangeOptionsMenuOpen,
    handleRangeOptionsMenuClose,
    currentDate,
    startDate,
    endDate,
    handleDatePickerCancel,
    isNextDisabled,
    handleCustomDateChange,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    setStartDay,
    setStartMonth,
    setStartYear,
    setEndDay,
    setEndMonth,
    setEndYear,
    isValidDay,
    isValidMonth,
    isValidYear,
    showDatePicker,
  } = useContext(AttendanceStatsContext) ?? null;

  const renderDate = React.useCallback(() => {
    switch (selectedDuration) {
      case SelectedDuration.CustomRange:
        return showDatePicker
          ? "Start Date to End Date"
          : `${formattedStartDate} to ${formattedEndDate}`;
      case SelectedDuration.Monthly:
        return currentDate.format("MMM - YYYY");
      case SelectedDuration.Yearly:
        return currentDate.format("YYYY");
      case SelectedDuration.Weekly:
        return `Week ${
          currentDate.week() - currentDate.startOf("month").week() + 1
        }, ${currentDate.format("MMM - YYYY")}`;
      default:
        return currentDate.format("DD, MMM - YYYY");
    }
  }, [selectedDuration, currentDate, showDatePicker]);

  const options = React.useMemo(
    () => [
      {
        id: SelectedDuration.Daily,
        label: "Daily",
        onPress: () => handleOptionSelect(SelectedDuration.Daily),
      },
      {
        id: SelectedDuration.Weekly,
        label: "Weekly",
        onPress: () => handleOptionSelect(SelectedDuration.Weekly),
      },
      {
        id: SelectedDuration.Monthly,
        label: "Monthly",
        onPress: () => handleOptionSelect(SelectedDuration.Monthly),
      },
      {
        id: SelectedDuration.Yearly,
        label: "Yearly",
        onPress: () => handleOptionSelect(SelectedDuration.Yearly),
      },
      {
        id: SelectedDuration.CustomRange,
        label: "Custom Date Range",
        onPress: () =>
          handleOptionSelect(SelectedDuration.CustomRange),
      },
    ],
    [handleOptionSelect]
  );

  const formattedStartDate = React.useMemo(
    () => dayjs(startDate).format("DD, MMM - YYYY"),
    [startDate]
  );
  const formattedEndDate = React.useMemo(
    () => dayjs(endDate).format("DD, MMM - YYYY"),
    [endDate]
  );

  const handleBackPress = React.useCallback(
    () => navigation.goBack(),
    [navigation]
  );

  return (
    <Box
      bg="$pixSecondaryLight50"
      w="$full"
      h="$28"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$4"
      pb="$2"
      borderBottomWidth={2}
      borderBottomColor={Colors.SecondaryLight100}
    >
      <BackArrowButton onPress={handleBackPress} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minWidth="$48"
      >
        <Text
          color={Colors.Text100}
          fontSize="$md"
          fontWeight="$medium"
          mb="$2"
        >
          {title}
        </Text>
        <Box display="flex" flexDirection="row" alignItems="center">
          {selectedDuration !== SelectedDuration.CustomRange && (
            <Pressable onPress={handlePrevDay} p="$4">
              <FontAwesomeIcon
                icon="arrow-left"
                size={16}
                color={Colors.Primary}
              />
            </Pressable>
          )}
          <Text px="$2">{renderDate()}</Text>
          {selectedDuration !== SelectedDuration.CustomRange && (
            <Pressable
              onPress={handleNextDay}
              p="$4"
              disabled={isNextDisabled}
              opacity={isNextDisabled ? 0.5 : 1}
            >
              <FontAwesomeIcon
                icon="arrow-right"
                size={16}
                color={Colors.Primary}
              />
            </Pressable>
          )}
        </Box>
      </Box>
      <Pressable
        onPress={handleRangeOptionsMenuOpen}
        p="$4"
        display="flex"
        flexDirection="column"
        alignItems="center"
        minWidth="$16"
      >
        <FontAwesomeIcon
          icon={faCalendarAlt}
          size={18}
          color={Colors.Primary}
        />
        <Text color={Colors.Text100} mt="$1">
          {selectedDuration === SelectedDuration.CustomRange
            ? "Custom"
            : options.find((option) => option.id === selectedDuration)
                ?.label || "Daily"}
        </Text>
      </Pressable>
      <OptionsMenu
        options={options}
        isOpen={isOptionsMenuOpen}
        onClose={handleRangeOptionsMenuClose}
      />
      <DatePicker
        isOpen={showDatePicker}
        handleDatePickerCancel={handleDatePickerCancel}
        handleCustomDateChange={handleCustomDateChange}
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        setStartDay={setStartDay}
        setStartMonth={setStartMonth}
        setStartYear={setStartYear}
        setEndDay={setEndDay}
        setEndMonth={setEndMonth}
        setEndYear={setEndYear}
        isValidDay={isValidDay}
        isValidMonth={isValidMonth}
        isValidYear={isValidYear}
      />
    </Box>
  );
};

export default React.memo(StatsHeader);
