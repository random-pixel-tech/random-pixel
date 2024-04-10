import React from 'react';
import { Box } from '@gluestack-ui/themed';
import Chip from '../../../components/Chip';
import { AttendanceStatusLabel, AttendanceStatus } from '../../../services/utils/enums';

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
      <Chip
        label={AttendanceStatusLabel.All}
        count={allCount}
        isSelected={selectedStatus === null}
        onPress={() => onStatusClick(null)}
        isDisabled={allCount === 0}
      />
      <Chip
        label={AttendanceStatusLabel.Present}
        count={presentCount}
        isSelected={selectedStatus === AttendanceStatus.Present}
        onPress={() => onStatusClick(AttendanceStatus.Present)}
        isDisabled={presentCount === 0}
      />
      <Chip
        label={AttendanceStatusLabel.Absent}
        count={absentCount}
        isSelected={selectedStatus === AttendanceStatus.Absent}
        onPress={() => onStatusClick(AttendanceStatus.Absent)}
        isDisabled={absentCount === 0}
      />
      <Chip
        label={AttendanceStatusLabel.OnLeave}
        count={onLeaveCount}
        isSelected={selectedStatus === AttendanceStatus.OnLeave}
        onPress={() => onStatusClick(AttendanceStatus.OnLeave)}
        isDisabled={onLeaveCount === 0}
      />
    </Box>
  );
};

export default StatusFilter;