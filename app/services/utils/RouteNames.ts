export enum RouteNames {
    ControlRoom = 'ControlRoom',
    CaptureAttendance = 'CaptureAttendance',
    ClassAttendance = 'ClassAttendance',
    StudentAttendance = 'StudentAttendance',
    AttendanceSummary = 'AttendanceSummary',
  }
  
  export type RootStackParamList = {
    [RouteNames.ControlRoom]: undefined;
    [RouteNames.CaptureAttendance]: undefined;
    [RouteNames.ClassAttendance]: undefined;
    [RouteNames.StudentAttendance]: undefined;
    [RouteNames.AttendanceSummary]: undefined;
  };