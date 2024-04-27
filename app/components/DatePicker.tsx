import React, { useState } from 'react';
import {
  Button,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Heading,
  Divider,
  Text,
  Input,
  InputField,
  VStack,
  Box,
} from '@gluestack-ui/themed';

interface DatePickerProps {
  isOpen: boolean;
  handleDatePickerCancel: () => void;
  handleCustomDateChange: () => void;
  startDay: string;
  startMonth: string;
  startYear: string;
  endDay: string;
  endMonth: string;
  endYear: string;
  setStartDay: (value: string) => void;
  setStartMonth: (value: string) => void;
  setStartYear: (value: string) => void;
  setEndDay: (value: string) => void;
  setEndMonth: (value: string) => void;
  setEndYear: (value: string) => void;
  isValidDay: (day: string, month: string, year: string) => boolean;
  isValidMonth: (month: string) => boolean;
  isValidYear: (year: string) => boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  handleDatePickerCancel,
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
}) => {
  const [showError, setShowError] = useState(false);

  const renderDateInput = (
    day: string,
    month: string,
    year: string,
    setDay: (value: string) => void,
    setMonth: (value: string) => void,
    setYear: (value: string) => void
  ) => (
    <Box display="flex" flexDirection="row" justifyContent="space-between" mb="$4">
      <Box display="flex" flexDirection="column" w="$1/5">
        <Input variant="underlined" isInvalid={!isValidDay(day, month, year)}>
          <InputField w="$0.5" placeholder="DD" value={day} onChangeText={setDay} />
        </Input>
        <Text alignSelf="center">Day</Text>
      </Box>
      <Box display="flex" flexDirection="column" w="$1/5">
        <Input variant="underlined" isInvalid={!isValidMonth(month)}>
          <InputField w="$0.5" placeholder="MM" value={month} onChangeText={setMonth} />
        </Input>
        <Text alignSelf="center">Month</Text>
      </Box>
      <Box display="flex" flexDirection="column" w="$1/5">
        <Input variant="underlined" isInvalid={!isValidYear(year)}>
          <InputField w="$0.5" placeholder="YYYY" value={year} onChangeText={setYear} />
        </Input>
        <Text alignSelf="center">Year</Text>
      </Box>
    </Box>
  );

  const handleOkClick = () => {
    const isInvalid =
      !isValidDay(startDay, startMonth, startYear) ||
      !isValidMonth(startMonth) ||
      !isValidYear(startYear) ||
      !isValidDay(endDay, endMonth, endYear) ||
      !isValidMonth(endMonth) ||
      !isValidYear(endYear);

    if (isInvalid) {
      setShowError(true);
    } else {
      handleCustomDateChange();
    }
  };

  const handleCancel = () => {
    setShowError(false);
    handleDatePickerCancel();
  };

  React.useEffect(() => {
    if (isOpen) {
      setShowError(false);
    }
  }, [isOpen]);

  return (
    <AlertDialog isOpen={isOpen} onClose={handleCancel}>
      <AlertDialogBackdrop />
      <AlertDialogContent bg="$pixSecondaryLight50">
        <AlertDialogHeader>
          <Heading size="lg">Select Date Range</Heading>
        </AlertDialogHeader>
        <Divider />
        <AlertDialogBody mt="$4">
          <Text mb="$4" color="$pixText100">
            Start Date
          </Text>
          {renderDateInput(startDay, startMonth, startYear, setStartDay, setStartMonth, setStartYear)}
          <Text my="$4" color="$pixText100">
            End Date
          </Text>
          {renderDateInput(endDay, endMonth, endYear, setEndDay, setEndMonth, setEndYear)}
          {showError && (
            <Text color="$red500" mt="$4">
              Invalid selected range. Please check it again.
            </Text>
          )}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" mr="$4" onPress={handleCancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleOkClick}>
            <ButtonText>Ok</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DatePicker;