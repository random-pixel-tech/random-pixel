import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import AttendanceCard from './AttendanceCard';
import useStudentAttendance, { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';

const AttendanceView: React.FC = () => {
    const [allStudentAttendanceData, setAllStudentAttendanceData] = useState<AllStudentAttendanceData[]>([]);
    const { fetchAllStudentAttendance } = useStudentAttendance(); // Remove className and section from here

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllStudentAttendance();
      setAllStudentAttendanceData(data);
    };

    fetchData();
  }, [fetchAllStudentAttendance]);

  return (
    <ScrollView>
      <Box p="$4">
        {allStudentAttendanceData.map((data) => (
          <AttendanceCard
          key={data.student.id}
          studentAttendanceData={data}
          className={data.className}
          section={data.section}
        />
        
        ))}
      </Box>
    </ScrollView>
  );
};

export default AttendanceView;
