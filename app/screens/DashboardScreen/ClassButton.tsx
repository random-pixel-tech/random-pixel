import React from 'react';
import { useAttendanceRecords } from '../../services/utils/api/useAttendanceRecords';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface ClassButtonProps {
  classNumber: number;
}

const ClassButton: React.FC<ClassButtonProps> = ({ classNumber }) => {
  const { fetchAttendanceRecordsByClassName } = useAttendanceRecords();

  const handlePress = () => {
    fetchAttendanceRecordsByClassName(`Class ${classNumber}`);
  };

  return (
    <Button onPress={handlePress} m='$4' w='$1/3'>
      <ButtonText>Class {classNumber}</ButtonText>
    </Button>
  );
};

export default ClassButton;
