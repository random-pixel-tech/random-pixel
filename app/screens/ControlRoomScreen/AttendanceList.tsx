import React from 'react';
import { Box, Checkbox, CheckboxIcon, CheckboxIndicator, Text, CheckIcon, ScrollView } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AttendanceOptions from './AttendanceOptions';
import { Student, AttendanceRecord } from '../../services/utils/api/useStudentAttendance';

interface AttendanceListProps {
    studentAttendanceData: Array<{
        student: Student;
        attendanceRecord: AttendanceRecord | null;
    }>;
    isPopoverOpen: Record<string, boolean>;
    handleOpenPopover: (studentId: string) => void;
    handleClosePopover: (studentId: string) => void;
    selectedCheckbox: Record<string, 'present' | 'absent' | 'leave' | null>;
    handleCheckboxChange: (studentId: string, status: 'present' | 'absent' | 'leave') => void;
    handleLeaveClick: (studentId: string) => void;

}

const AttendanceList: React.FC<AttendanceListProps> = ({
    studentAttendanceData,
    isPopoverOpen,
    handleOpenPopover,
    handleClosePopover,
    selectedCheckbox,
    handleCheckboxChange,
    handleLeaveClick,
}) => {
    return (
      <ScrollView>
        <Box display="flex" flexDirection="column">
            {/* Attendance list header */}
            <Box display="flex" py="$2" flexDirection="row" bg="$pixSecondaryLight50">
                <Box w="$1/6" px="$4" justifyContent="center">
                    <Text bold={true} color="$pixTextDark100">
                        Roll No.
                    </Text>
                </Box>
                <Box w="$2/5" px="$4" justifyContent="center">
                    <Text bold={true} color="$pixTextDark100">
                        Name
                    </Text>
                </Box>
                <Box w="$1/6" px="$4" justifyContent="center">
                    <Text bold={true} color="$pixTextDark100">
                        P
                    </Text>
                </Box>
                <Box w="$1/6" px="$4" justifyContent="center">
                    <Text bold={true} color="$pixTextDark100">
                        A
                    </Text>
                </Box>
                <Box justifyContent="center" w="$1/6">
                    <FontAwesomeIcon icon="ellipsis-vertical" size={20} />
                </Box>
            </Box>

            {/* Attendance list items */}
            {studentAttendanceData.map(({ student, attendanceRecord }) => (
                <Box key={student.id} display="flex" py="$2" flexDirection="row" minHeight={40}>
                    <Box w="$1/6" px="$4">
                        <Text>{student.roll_number || '-'}</Text>
                    </Box>
                    <Box w="$2/5" px="$4">
                        <Text>{student.name}</Text>
                    </Box>
                    <Box w="$1/6" px="$4" justifyContent="center">
                        <Checkbox
                            value={`morning-present-${student.id}`}
                            isChecked={selectedCheckbox[student.id] === 'present'}
                            onChange={() => handleCheckboxChange(student.id, 'present')}
                            rounded="$md"
                            aria-label={`Mark present for ${student.name}`}
                        >
                            <CheckboxIndicator borderColor="$pixPrimary" bg={selectedCheckbox[student.id] === 'present' ? '$pixPrimary' : 'transparent'}
                            >
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                        </Checkbox>
                    </Box>
                    <Box w="$1/6" px="$4" justifyContent="center">
                        <Box flexDirection="row" alignItems="center">
                            <Box minWidth={24}>
                                <Checkbox
                                    value={`morning-absent-${student.id}`}
                                    isChecked={selectedCheckbox[student.id] === 'absent' || selectedCheckbox[student.id] === 'leave'}
                                    onChange={() => handleCheckboxChange(student.id, 'absent')}
                                    aria-label={`Mark absent for ${student.name}`}
                                    rounded="$md"
                                >
                                    <CheckboxIndicator borderColor="$pixOrange" bg={selectedCheckbox[student.id] === 'absent' || selectedCheckbox[student.id] === 'leave' ? '$pixOrange' : 'transparent'}>
                                        <CheckboxIcon as={CheckIcon} />
                                    </CheckboxIndicator>
                                </Checkbox>
                            </Box>
                            {selectedCheckbox[student.id] === 'leave' && (
                                <FontAwesomeIcon icon="house-user" size={20} color="#f4ca4d" />
                            )}
                        </Box>
                    </Box>
                    <AttendanceOptions
                        isOpen={isPopoverOpen[student.id] || false}
                        onClose={() => handleClosePopover(student.id)}
                        onOpen={() => handleOpenPopover(student.id)}
                        student={student}
                        onLeaveClick={handleLeaveClick}
                    />
                </Box>
            ))}
        </Box>
        </ScrollView>
    );
};

export default AttendanceList;