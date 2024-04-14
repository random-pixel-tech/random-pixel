import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import useStudentAttendance, { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';

interface AttendanceViewProps {
    selectedOption: string;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({ selectedOption }) => {
    const [allStudentAttendanceData, setAllStudentAttendanceData] = useState<AllStudentAttendanceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { fetchAllStudentAttendance, fetchAttendanceByTime } = useStudentAttendance();

    // Memoize fetchAllStudentAttendance to prevent unnecessary re-renders
    const memoizedFetchAllStudentAttendance = useMemo(() => fetchAllStudentAttendance, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await memoizedFetchAllStudentAttendance();
                setAllStudentAttendanceData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [memoizedFetchAllStudentAttendance]);

    return (
        <ScrollView>
            <Box p="$4">
                {isLoading ? (
                    <Box><Text>Loading...</Text></Box>
                ) : (
                    allStudentAttendanceData.map((data) => (
                        <AttendanceCard
                            key={data.student.id}
                            studentAttendanceData={data}
                            className={data.className}
                            section={data.section}
                            fetchAttendanceByTime={fetchAttendanceByTime}
                            selectedOption={selectedOption}
                        />
                    ))
                )}
            </Box>
        </ScrollView>
    );
};

export default AttendanceView;