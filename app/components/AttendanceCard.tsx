import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { StudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface AttendanceCardProps {
    studentAttendanceData: StudentAttendanceData;
    className: string;
    section: string;
}

// Helper function to convert numbers to ordinal form
const toOrdinal = (n: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

const AttendanceCard: React.FC<AttendanceCardProps> = ({
    studentAttendanceData,
    className,
    section,
}) => {
    const { student, attendanceRecord } = studentAttendanceData;
    const { name, rollNumber } = student;
    const { morningStatus, afternoonStatus } = attendanceRecord || {};

    // Convert className to ordinal form
    const classNameOrdinal = toOrdinal(parseInt(className));

    return (
        <Box
            bg="#F8F8FF"
            p="$4"
            borderRadius="$md"
            mb="$4"
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            borderColor='$pixPrimaryLight50'
            borderWidth={1}
        >
            <Box display='flex' flexDirection='column'>
                <Text fontSize="$lg" fontWeight="$bold" mb="$2" color='$pixPrimaryDark50'>
                    {name}
                </Text>
                <Box display='flex' flexDirection='row' alignContent='center' mb='$2'>
                    <Text fontSize="$sm" color='$pixSecondary2' pr='$1'>
                        Roll No:
                    </Text>
                    <Text fontSize="$sm" color='$pixPrimaryDark50'>
                        {rollNumber}
                    </Text>
                </Box>
                <Box display='flex' flexDirection='row' alignContent='center'>
                    <Box display='flex' flexDirection='row' alignContent='center'>
                        <Text fontSize="$sm" color='$pixSecondary2' pr='$1'>
                            Class:
                        </Text>
                        <Text fontSize="$sm" color='$pixPrimaryDark50' pr='$1'>
                            {classNameOrdinal}
                        </Text>
                    </Box>
                    <Box display='flex' flexDirection='row' alignContent='center'>
                        <Text fontSize="$sm" color='$pixSecondary2' pr='$1'>
                            Section:
                        </Text>
                        <Text fontSize="$sm" color='$pixPrimaryDark50'>
                            {section}
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Box display='flex' flexDirection='column' justifyContent='space-between'>
                <Box bg='#DFD6F8' px='$2' py='$0.5' rounded='$md' alignSelf='flex-end'>
                    <Text fontSize="$sm" color='$pixPrimaryDark50'>
                        #189/232
                    </Text>
                </Box>
                {/* <Box alignContent='center'>
                    <Box display='flex' flexDirection='row'>
                    <Text fontSize="$md" color='$pixSecondary2'>S-1</Text>
                    <Text fontSize="$md" color='$pixText100' mr='$2'>: A</Text>
                    <Text fontSize="$md" color='$pixSecondary2'>S-2</Text>
                    <Text fontSize="$md" color='$pixText100'>: P</Text>
                    </Box>
                    <Text fontSize="$sm" color='$pixSecondary2' alignSelf='center'>Attendance</Text>
                </Box> */}
                <Box alignContent='center' display='flex' flexDirection='row'>
                    <Box display='flex' flexDirection='column' mr='$2'>
                        <Text fontSize="$md" color='$pixText100' alignSelf='center'>4/5</Text>
                        <Text fontSize="$sm" color='$pixSecondary2'>Attendance</Text>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <Text fontSize="$md" color='$pixText100' alignSelf='center'>80%</Text>
                        <Text fontSize="$sm" color='$pixSecondary2'>Percentage</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AttendanceCard;
