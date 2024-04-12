import { AttendanceStatus } from "./enums";
import { FilterOption } from "../../components/FilterBar";

export type AttendanceStatusOrNull = AttendanceStatus | null;

export const getFilterOptions = (
  totalStudents: number,
  presentCount: number,
  absentCount: number,
  onLeaveCount: number
): FilterOption<AttendanceStatusOrNull>[] => [
  { label: 'All', value: null, count: totalStudents },
  { label: 'Present', value: AttendanceStatus.Present, count: presentCount },
  { label: 'Absent', value: AttendanceStatus.Absent, count: absentCount },
  { label: 'On Leave', value: AttendanceStatus.OnLeave, count: onLeaveCount },
];

export const filterOptions = (
  totalStudents: number,
  presentCount: number,
  absentCount: number,
  onLeaveCount: number
): FilterOption<AttendanceStatusOrNull>[] =>
  getFilterOptions(totalStudents, presentCount, absentCount, onLeaveCount);