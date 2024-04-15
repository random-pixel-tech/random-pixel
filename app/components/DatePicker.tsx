import React, { useState } from 'react';
import { Button, ButtonText, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading, Divider, Text, Input, InputField, VStack, Box } from '@gluestack-ui/themed';

interface DatePickerProps {
    isOpen: boolean;
    onCancel: () => void;
    onOk: (startDate: string, endDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ isOpen, onCancel, onOk }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [editingStartDate, setEditingStartDate] = useState(false);
    const [editingEndDate, setEditingEndDate] = useState(false);

    const handleOk = () => {
        onOk(startDate, endDate);
    };

    const renderStartDateInput = () => (
        <Box display="flex" flexDirection='row' justifyContent='space-between' mb="$4">
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='01'>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='JAN'>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='2024'>
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
                    <InputField w="$0.5" placeholder='01'>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Day
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='JAN'>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Month
                </Text>
            </Box>
            <Box display="flex" flexDirection='column' w="$1/5">
                <Input variant="underlined">
                    <InputField w="$0.5" placeholder='2024'>
                    </InputField>
                </Input>
                <Text alignSelf='center'>
                    Year
                </Text>
            </Box>
        </Box>
    );

    return (
        <AlertDialog isOpen={isOpen} onClose={onCancel}>

            <AlertDialogBackdrop />
            <AlertDialogContent bg="$pixSecondaryLight50">
                <AlertDialogHeader>
                    <Heading size="lg">Select Date Range</Heading>
                </AlertDialogHeader>
                <Divider />
                <AlertDialogBody mt="$4">
                <Text mb="$4" color='$pixText100'>Start Date</Text>

                    {editingStartDate ? renderStartDateInput() : (
                        <>
                            <Button w="$2/3" alignSelf='center' mb="$4" onPress={() => setEditingStartDate(true)}>
                                <ButtonText>Start Date</ButtonText>
                            </Button>
                        </>
                    )}
                                                <Text mb="$4" color='$pixText100'>End Date</Text>

                    {editingEndDate ? renderEndDateInput() : (
                        <>
                            <Button w="$2/3" alignSelf='center' mb="$4" onPress={() => setEditingEndDate(true)}>
                                <ButtonText>End Date</ButtonText>
                            </Button>
                        </>
                    )}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        mr="$4"
                        onPress={onCancel}
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
