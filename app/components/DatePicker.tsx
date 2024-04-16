// DatePicker.tsx
import React, { useState } from 'react';
import { Button, ButtonText, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading, Divider, Text, Input, InputField, VStack, Box } from '@gluestack-ui/themed';
import dayjs from 'dayjs';

interface DatePickerProps {
    isOpen: boolean;
    handleDatePickerCancel: () => void;
    handleDatePickerOk: (startDate: string, endDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, handleDatePickerCancel, handleDatePickerOk }) => {
    const [startDay, setStartDay] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');

    const isValidDay = (day: string) => {
        const validDays = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        return validDays.includes(day);
    };

    const isValidMonth = (month: string) => {
        const validMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return validMonths.includes(month);
    };

    const isValidYear = (year: string) => {
        const yearRegex = /^[0-9]{4}$/;
        return yearRegex.test(year);
    };

    const handleOk = () => {
        if (!isValidDay(startDay) || !isValidMonth(startMonth) || !isValidYear(startYear) || !isValidDay(endDay) || !isValidMonth(endMonth) || !isValidYear(endYear)) {
            // Handle invalid input, show an error message or perform any other desired action
            return;
        }

        const formattedStartDate = dayjs(`${startDay} ${startMonth} ${startYear}`, 'DD MMM YYYY').format('YYYY-MM-DD');
        const formattedEndDate = dayjs(`${endDay} ${endMonth} ${endYear}`, 'DD MMM YYYY').format('YYYY-MM-DD');
        handleDatePickerOk(formattedStartDate, formattedEndDate);
    };

    const handleStartMonthChange = (value: string) => {
        setStartMonth(value.toUpperCase());
    };

    const handleEndMonthChange = (value: string) => {
        setEndMonth(value.toUpperCase());
    };

    const renderStartDateInput = () => (
        <Box display="flex" flexDirection='row' justifyContent='space-between' mb="$4">
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidDay(startDay)}>
                    <InputField w="$0.5" placeholder='01' value={startDay} onChangeText={setStartDay}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidMonth(startMonth)}>
                    <InputField w="$0.5" placeholder='JAN' value={startMonth} onChangeText={handleStartMonthChange}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidYear(startYear)}>
                    <InputField w="$0.5" placeholder='2024' value={startYear} onChangeText={setStartYear}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Year
                </Text>
            </Box>
        </Box>
    );

    const renderEndDateInput = () => (
        <Box display="flex" flexDirection='row' justifyContent='space-between' mb="$4">
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidDay(endDay)}>
                    <InputField w="$0.5" placeholder='01' value={endDay} onChangeText={setEndDay}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidMonth(endMonth)}>
                    <InputField w="$0.5" placeholder='JAN' value={endMonth} onChangeText={handleEndMonthChange}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined" isInvalid={!isValidYear(endYear)}>
                    <InputField w="$0.5" placeholder='2024' value={endYear} onChangeText={setEndYear}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Year
                </Text>
            </Box>
        </Box>
    );

    return (
        <AlertDialog isOpen={isOpen} onClose={handleDatePickerCancel}>
            <AlertDialogBackdrop />
            <AlertDialogContent bg="$pixSecondaryLight50">
                <AlertDialogHeader>
                    <Heading size="lg">Select Date Range</Heading>
                </AlertDialogHeader>
                <Divider />
                <AlertDialogBody mt="$4">
                    <Text mb="$4" color='$pixText100'>Start Date</Text>
                    {renderStartDateInput()}
                    <Text mb="$4" color='$pixText100'>End Date</Text>
                    {renderEndDateInput()}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        mr="$4"
                        onPress={handleDatePickerCancel}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        onPress={handleOk}
                    >
                        <ButtonText>Ok</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DatePicker;