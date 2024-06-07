import { AttendanceSession } from './enums';

export enum RouteNames {

    // Control Room
    ControlRoom = 'ControlRoom',
    CaptureAttendance = 'CaptureAttendance',
    ClassAttendance = 'ClassAttendance',
    StudentAttendance = 'StudentAttendance',
    AttendanceSummary = 'AttendanceSummary',

    // Dashboard
    Dashboard = 'DashboardHome',
    AttendanceStats = 'AttendanceStats',

    // Capture Attendance
    GenerateReport = 'GenerateReport',

    // Home
    Timeline = 'Timeline'
  }
  
  export type RootStackParamList = {
    // Control Room
    [RouteNames.ControlRoom]: undefined;
    [RouteNames.CaptureAttendance]: undefined;
    [RouteNames.ClassAttendance]: undefined;
    [RouteNames.StudentAttendance]: undefined;
    [RouteNames.AttendanceSummary]: { session: AttendanceSession };

    // Dashboard
    [RouteNames.Dashboard]: undefined;
    [RouteNames.AttendanceStats]: undefined;

    // Capture Attendance
    [RouteNames.GenerateReport]: undefined

    // Home
    [RouteNames.Timeline]: undefined

  };