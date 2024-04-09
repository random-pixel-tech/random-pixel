import React from 'react';
import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { AttendanceStatus } from '../../../services/utils/api/useStudentAttendance';

interface StatusFilterProps {
    selectedStatus: AttendanceStatus | null;
    onStatusClick: (status: AttendanceStatus | null) => void;
    allCount: number;
    presentCount: number;
    absentCount: number;
    onLeaveCount: number;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
    selectedStatus,
    onStatusClick,
    allCount,
    presentCount,
    absentCount,
    onLeaveCount,
}) => {
    return (
        <Box flexDirection="row" justifyContent="space-between" p="$4">
            <Pressable onPress={() => onStatusClick(null)}>
                <Box bg='$pixSecondary' py='$2' px='$6' mr='$4' rounded='$full' borderWidth={selectedStatus === null ? 1 : 0} borderColor='$pixPrimary'>
                    <Text color={selectedStatus === null ? '$pixPrimary' : '$pixText'}>
                        All&nbsp;
                        <Text fontWeight="$medium" color={selectedStatus === null ? '$pixPrimary' : '$pixText'}>
                            {allCount}
                        </Text>
                    </Text>
                </Box>
            </Pressable>
            <Pressable onPress={() => onStatusClick(AttendanceStatus.Present)}>
                <Box bg='$pixSecondary' py='$2' px='$6' mr='$4' rounded='$full' borderWidth={selectedStatus === AttendanceStatus.Present ? 1 : 0} borderColor='$pixPrimary'>
                    <Text color={selectedStatus === AttendanceStatus.Present ? '$pixPrimary' : '$pixText'}>
                        Present&nbsp;
                        <Text fontWeight="$medium" color={selectedStatus === AttendanceStatus.Present ? '$pixPrimary' : '$pixText'}>
                            {presentCount}
                        </Text>
                    </Text>
                </Box>
            </Pressable>
            <Pressable onPress={() => onStatusClick(AttendanceStatus.Absent)}>
                <Box bg='$pixSecondary' py='$2' px='$6' mr='$4' rounded='$full' borderWidth={selectedStatus === AttendanceStatus.Absent ? 1 : 0} borderColor='$pixPrimary'>
                    <Text color={selectedStatus === AttendanceStatus.Absent ? '$pixPrimary' : '$pixText'}>
                        Absent&nbsp;
                        <Text fontWeight="$medium" color={selectedStatus === AttendanceStatus.Absent ? '$pixPrimary' : '$pixText'}>
                            {absentCount}
                        </Text>
                    </Text>
                </Box>
            </Pressable>
            <Pressable onPress={() => onStatusClick(AttendanceStatus.OnLeave)}>
                <Box bg='$pixSecondary' py='$2' px='$6' mr='$4' rounded='$full' borderWidth={selectedStatus === AttendanceStatus.OnLeave ? 1 : 0} borderColor='$pixPrimary'>
                    <Text color={selectedStatus === AttendanceStatus.OnLeave ? '$pixPrimary' : '$pixText'}>
                        On Leave&nbsp;
                        <Text fontWeight="$medium" color={selectedStatus === AttendanceStatus.OnLeave ? '$pixPrimary' : '$pixText'}>
                            {onLeaveCount}
                        </Text>
                    </Text>
                </Box>
            </Pressable>
        </Box>
    );
};

export default StatusFilter;
