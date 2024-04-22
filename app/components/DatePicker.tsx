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

    const isValidDay = (day: string, month: string, year: string) => {
        const parsedDay = parseInt(day, 10);
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);
        const maxDays = dayjs(`${parsedYear}-${parsedMonth}-01`).daysInMonth();
        return parsedDay >= 1 && parsedDay <= maxDays;
    };

    const isValidMonth = (month: string) => {
        const parsedMonth = parseInt(month, 10);
        return parsedMonth >= 1 && parsedMonth <= 12;
    };

    const isValidYear = (year: string) => {
        const parsedYear = parseInt(year, 10);
        const currentYear = dayjs().year();
        return parsedYear >= currentYear - 10 && parsedYear <= currentYear + 10;
    };
    

    const isValidDate = (day: string, month: string, year: string) => {
        return isValidDay(day, month, year) && isValidMonth(month) && isValidYear(year);
    };

    const isEndDateValid = (startDate: string, endDate: string) => {
        return dayjs(endDate).isAfter(startDate) || dayjs(endDate).isSame(startDate);
    };

    const handleOk = () => {
        const startDate = `${startYear}-${startMonth}-${startDay}`;
        const endDate = `${endYear}-${endMonth}-${endDay}`;

        if (!isValidDate(startDay, startMonth, startYear) || !isValidDate(endDay, endMonth, endYear) || !isEndDateValid(startDate, endDate)) {
            // Handle invalid input, show an error message or perform any other desired action
            return;
        }

        handleDatePickerOk(startDate, endDate);
    };

    const renderDateInput = (day: string, month: string, year: string, setDay: (value: string) => void, setMonth: (value: string) => void, setYear: (value: string) => void) => (
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

    return (
        <AlertDialog isOpen={isOpen} onClose={handleDatePickerCancel}>
            <AlertDialogBackdrop />
            <AlertDialogContent bg="$pixSecondaryLight50">
                <AlertDialogHeader>
                    <Heading size="lg">Select Date Range</Heading>
                </AlertDialogHeader>
                <Divider />
                <AlertDialogBody mt="$4">
                    <Text mb="$4" color="$pixText100">Start Date</Text>
                    {renderDateInput(startDay, startMonth, startYear, setStartDay, setStartMonth, setStartYear)}
                    <Text mb="$4" color="$pixText100">End Date</Text>
                    {renderDateInput(endDay, endMonth, endYear, setEndDay, setEndMonth, setEndYear)}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant="outline" mr="$4" onPress={handleDatePickerCancel}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button onPress={handleOk}>
                        <ButtonText>Ok</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DatePicker;