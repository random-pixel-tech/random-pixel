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

    const handleOk = () => {
        const formattedStartDate = dayjs(`${startDay} ${startMonth} ${startYear}`, 'DD MMM YYYY').format('YYYY-MM-DD');
        const formattedEndDate = dayjs(`${endDay} ${endMonth} ${endYear}`, 'DD MMM YYYY').format('YYYY-MM-DD');
        handleDatePickerOk(formattedStartDate, formattedEndDate);
    };

    const renderStartDateInput = () => (
        <Box display="flex" flexDirection='row' justifyContent='space-between' mb="$4">
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='01' value={startDay} onChangeText={setStartDay}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='JAN' value={startMonth} onChangeText={setStartMonth}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
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
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='01' value={endDay} onChangeText={setEndDay}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='JAN' value={endMonth} onChangeText={setEndMonth}>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
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