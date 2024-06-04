import React, { useState } from 'react';
import { Box, VStack } from '@gluestack-ui/themed';
import Header from '../../../components/Header';
import SelectDropdown from '../../../components/SelectDropdown';
import InsightBox from '../../../components/InsightBox';

const GenerateReport = () => {
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const durationOptions = [
        { label: 'Jan (2024)', value: 'jan2024' },
        { label: 'Feb (2024)', value: 'feb2024' },
        { label: 'Mar (2024)', value: 'mar2024' },
        { label: 'Dec (2024)', value: 'dec2024' },
    ];

    const classOptions = [
        { label: '1 A', value: '1a' },
        { label: '1 B', value: '1b' },
    ];

    const handleDurationChange = (value: string) => {
        setSelectedDuration(value);
        // Perform any additional operations with the selected duration
    };

    const handleClassChange = (value: string) => {
        setSelectedClass(value);
        // Perform any additional operations with the selected class
    };

    return (
        <Box bg="$pixSecondaryLight50" w="$full" h="$full">
            <Header title="Generate Attendance Report" />
            <VStack mt="$4" px="$4">
                <SelectDropdown
                    label="Select Duration"
                    options={durationOptions}
                    defaultValue={durationOptions[0].value}
                    onChange={handleDurationChange}
                />
                <SelectDropdown
                    label="Select Class"
                    options={classOptions}
                    defaultValue={classOptions[0].value}
                    onChange={handleClassChange}
                />
            </VStack>

            <Box display='flex' flexDirection='row'>
                {/* <InsightBox
                    labelType="warn"
                    labelText="Low Attendance"
                    count={56}
                    countLabel="Students"
                    timeDuration="last 30 days"
                    benchmark="< 75%"
                />

                <InsightBox
                    labelType="info"
                    labelText="Info Label"
                    count={32}
                    countLabel="Teachers"
                    timeDuration="last 7 days"
                    benchmark="> 80%"
                /> */}

                <InsightBox
                    labelType="error"
                    labelText="Error Occurred"
                    count={10}
                    countLabel="Classes"
                    timeDuration="last 14 days"
                    benchmark="< 50%"
                />

                <InsightBox
                    labelType="success"
                    labelText="Success!"
                    count={75}
                    countLabel="Subjects"
                    timeDuration="last 30 days"
                    benchmark="> 90%"
                />
            </Box>
        </Box>
    );
};

export default GenerateReport;