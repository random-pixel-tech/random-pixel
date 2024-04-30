import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { supabase } from '../supabase';
import { AttendanceStatus, SelectedDuration } from '../enums';
import useStudentAttendance, { AllStudentAttendanceData } from './useStudentAttendance';

dayjs.extend(weekOfYear);

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

export interface ClassData {
  classId: string;
  className: string;
  section: string;
  totalStudents: number;
  totalStudentsSum: number;
  presentStudents: number;
  presentPercentage: number;
}

export const useAttendanceStats = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDuration, setSelectedDuration] = useState(SelectedDuration.Daily);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isClassOptionSelected, setIsClassOptionSelected] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [selectedFilterOption, setSelectedFilterOption] = useState('Attendance Percentage');
  const [showFilterActionsheet, setShowFilterActionsheet] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState('Filter');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    attendance: [],
    class: [],
    section: [],
  });

  const [attendanceDataByTime, setAttendanceDataByTime] = useState<{ [studentId: string]: { totalAttendance: number; presentAttendance: number } }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchAllStudentAttendance } = useStudentAttendance();

  const [allStudentAttendanceData, setAllStudentAttendanceData] = useState<AllStudentAttendanceData[]>([]);

  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  const [classData, setClassData] = useState<ClassData[]>([]);
  const [selectedButton, setSelectedButton] = useState<'left' | 'right'>('left');

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const [searchButtonPress, setSearchButtonPress] = useState(false);
  const [filterButtonPress, setFilterButtonPress] = useState(false);

  const handleSearchButtonClick = (selectedButton: 'left' | 'right') => {
    setShowSearchInput(true);
    setSearchButtonPress(true);
    setSelectedButton(selectedButton);
  };
  
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchInput(false);
    setSearchButtonPress(false);
  };

  const isValidDay = (day: string, month: string, year: string) => {
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);
    const maxDays = dayjs(`${parsedYear}-${parsedMonth}-01`).daysInMonth();
    return parsedDay >= 1 && parsedDay <= maxDays;
};

const isValidMonth = (month: string) => {
    const parsedMonth = parseInt(month, 10);
    return parsedMonth >= 1 && parsedMonth <= 12;
};

const isValidYear = (year: string) => {
    const parsedYear = parseInt(year, 10);
    const currentYear = dayjs().year();
    return parsedYear >= currentYear - 10 && parsedYear <= currentYear + 10;
};


const isValidDate = (day: string, month: string, year: string) => {
    return isValidDay(day, month, year) && isValidMonth(month) && isValidYear(year);
};

const isEndDateValid = (startDate: string, endDate: string) => {
    return dayjs(endDate).isAfter(startDate) || dayjs(endDate).isSame(startDate);
};


const handleCustomDateChange = () => {
  const startDate = `${startYear}-${startMonth}-${startDay}`;
  const endDate = `${endYear}-${endMonth}-${endDay}`;

  if (!isValidDate(startDay, startMonth, startYear) || !isValidDate(endDay, endMonth, endYear) || !isEndDateValid(startDate, endDate)) {
      // Handle invalid input, show an error message or perform any other desired action
      return;
  }

  handleDatePickerOk(startDate, endDate);
};

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

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const studentIds = allStudentAttendanceData.map((data) => data.student.id);
      const attendanceData = await fetchAttendanceByTime(studentIds, startDate, endDate);
      setAttendanceDataByTime(attendanceData);
    };

    fetchAttendanceData();
  }, [allStudentAttendanceData, startDate, endDate]);

  // Calculate attendance percentage for each student
const attendanceDataWithPercentage: StudentAttendanceDataWithPercentage[] = useMemo(() => {
  return allStudentAttendanceData.map((data) => {
    const { totalAttendance, presentAttendance } = attendanceDataByTime[data.student.id] || { totalAttendance: 0, presentAttendance: 0 };
    const attendancePercentage = totalAttendance === 0 ? 0 : (presentAttendance / totalAttendance) * 100;
    return {
      ...data,
      attendancePercentage,
      totalAttendance,
      presentAttendance,
    };
  });
}, [allStudentAttendanceData, attendanceDataByTime]);

// Sort attendance data based on the selected sort option and class
const sortedAttendanceData = useMemo(() => {
  // Check if the sort option is not changed
  if (!sortOption) {
    return selectedButton === 'right' ? attendanceDataWithPercentage : classData;
  }

  // Sort function based on the selected option
const sortFunction = (a: StudentAttendanceDataWithPercentage | ClassData, b: StudentAttendanceDataWithPercentage | ClassData) => {
  if (selectedButton === 'right') {
    switch (sortOption) {
      case 'Name: A to Z':
        return (a as StudentAttendanceDataWithPercentage).student.name.localeCompare((b as StudentAttendanceDataWithPercentage).student.name);
      case 'Name: Z to A':
        return (b as StudentAttendanceDataWithPercentage).student.name.localeCompare((a as StudentAttendanceDataWithPercentage).student.name);
      case 'Attendance Percentage: Low to High':
        return (a as StudentAttendanceDataWithPercentage).attendancePercentage - (b as StudentAttendanceDataWithPercentage).attendancePercentage;
      case 'Attendance Percentage: High to Low':
        return (b as StudentAttendanceDataWithPercentage).attendancePercentage - (a as StudentAttendanceDataWithPercentage).attendancePercentage;
      case 'Class: Low to High':
        return compareClasses((a as StudentAttendanceDataWithPercentage).className, (b as StudentAttendanceDataWithPercentage).className);
      case 'Class: High to Low':
        return compareClasses((b as StudentAttendanceDataWithPercentage).className, (a as StudentAttendanceDataWithPercentage).className);
      default:
        return 0;
    }
  } else {
    switch (sortOption) {
      case 'Attendance Percentage: Low to High':
        return (a as ClassData).presentPercentage - (b as ClassData).presentPercentage;
      case 'Attendance Percentage: High to Low':
        return (b as ClassData).presentPercentage - (a as ClassData).presentPercentage;
      case 'Class: Low to High':
        return compareClasses((a as ClassData).className, (b as ClassData).className);
      case 'Class: High to Low':
        return compareClasses((b as ClassData).className, (a as ClassData).className);
      default:
        return 0;
    }
  }
};

// Helper function to compare class names and sections
const compareClasses = (classA: string, classB: string) => {
  const classNameA = parseInt(classA, 10);
  const classNameB = parseInt(classB, 10);

  if (classNameA === classNameB) {
    return classA.localeCompare(classB);
  }

  return classNameA - classNameB;
};


  // Sort based on the selected button
  return selectedButton === 'right'
    ? [...attendanceDataWithPercentage].sort(sortFunction)
    : [...classData].sort(sortFunction);
}, [attendanceDataWithPercentage, classData, sortOption, selectedButton]);

// Filter attendance data based on the selected filters
const filteredAttendanceData = useMemo(() => {
  // Filter function to check if a data point matches the selected filters and search query
  const filterFunction = (data: StudentAttendanceDataWithPercentage | ClassData) => {
    if (selectedButton === 'right') {
      const percentage = (data as StudentAttendanceDataWithPercentage).attendancePercentage;
      const className = (data as StudentAttendanceDataWithPercentage).className;
      const section = (data as StudentAttendanceDataWithPercentage).section;
      const studentName = (data as StudentAttendanceDataWithPercentage).student.name.toLowerCase();

      const matchesAttendanceFilter = selectedFilters.attendance.length === 0 || selectedFilters.attendance.some((filter) => {
        if (filter === '70% or below') {
          return percentage <= 70;
        } else if (filter === '70% to 90%') {
          return percentage > 70 && percentage <= 90;
        } else if (filter === 'Above 90%') {
          return percentage > 90;
        }
        return false;
      });

      const matchesClassFilter = selectedFilters.class.length === 0 || selectedFilters.class.includes(className);

      const matchesSectionFilter = selectedFilters.section.length === 0 || selectedFilters.section.includes(section);

      const matchesSearchQuery = studentName.includes(searchQuery.toLowerCase());

      return matchesAttendanceFilter && matchesClassFilter && matchesSectionFilter && matchesSearchQuery;
    } else {
      const percentage = (data as ClassData).presentPercentage;
      const className = (data as ClassData).className;
      const section = (data as ClassData).section;

      const matchesAttendanceFilter = selectedFilters.attendance.length === 0 || selectedFilters.attendance.some((filter) => {
        if (filter === '50% or below') {
          return percentage <= 50;
        } else if (filter === '50% to 70%') {
          return percentage > 50 && percentage <= 70;
        } else if (filter === 'Above 70%') {
          return percentage > 70;
        }
        return false;
      });

      const matchesClassFilter = selectedFilters.class.length === 0 || selectedFilters.class.includes(className);

      const matchesSectionFilter = selectedFilters.section.length === 0 || selectedFilters.section.includes(section);

      const matchesSearchQuery = className.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesAttendanceFilter && matchesClassFilter && matchesSectionFilter && matchesSearchQuery;
    }
  };

  // Apply filters and search query only if any filters are selected or search query is entered
  if (
    (!selectedFilters.attendance || selectedFilters.attendance.length === 0) &&
    (!selectedFilters.class || selectedFilters.class.length === 0) &&
    (!selectedFilters.section || selectedFilters.section.length === 0) &&
    !searchQuery
  ) {
    return sortedAttendanceData;
  } else {
    return selectedButton === 'right'
      ? (sortedAttendanceData as StudentAttendanceDataWithPercentage[]).filter(filterFunction)
      : (sortedAttendanceData as ClassData[]).filter(filterFunction);
  }
}, [sortedAttendanceData, selectedFilters, searchQuery, selectedButton]);

useEffect(() => {
  const dateRanges: Record<string, [string, string]> = {
    daily: [currentDate.format('YYYY-MM-DD'), currentDate.format('YYYY-MM-DD')],
    weekly: [currentDate.startOf('week').format('YYYY-MM-DD'), currentDate.endOf('week').format('YYYY-MM-DD')],
    monthly: [currentDate.startOf('month').format('YYYY-MM-DD'), currentDate.endOf('month').format('YYYY-MM-DD')],
    yearly: [currentDate.startOf('year').format('YYYY-MM-DD'), currentDate.endOf('year').format('YYYY-MM-DD')],
  };

  const [startDate, endDate] = dateRanges[selectedDuration] || [currentDate.format('YYYY-MM-DD'), currentDate.format('YYYY-MM-DD')];
  setStartDate(startDate);
  setEndDate(endDate);
}, [currentDate, selectedDuration]);


const handlePrevDay = () => {
  switch (selectedDuration) {
    case SelectedDuration.Daily:
      setCurrentDate(currentDate.subtract(1, 'day'));
      break;
    case SelectedDuration.Weekly:
      setCurrentDate(currentDate.subtract(1, 'week'));
      break;
    case SelectedDuration.Monthly:
      setCurrentDate(currentDate.subtract(1, 'month'));
      break;
    case SelectedDuration.Yearly:
      setCurrentDate(currentDate.subtract(1, 'year'));
      break;
    default:
      break;
  }
};

const handleNextDay = () => {
  switch (selectedDuration) {
    case SelectedDuration.Daily:
      setCurrentDate(currentDate.add(1, 'day'));
      break;
    case SelectedDuration.Weekly:
      setCurrentDate(currentDate.add(1, 'week'));
      break;
    case SelectedDuration.Monthly:
      setCurrentDate(currentDate.add(1, 'month'));
      break;
    case SelectedDuration.Yearly:
      setCurrentDate(currentDate.add(1, 'year'));
      break;
    default:
      break;
  }
};

const isNextDisabled = useMemo(() => {
  if (selectedDuration === SelectedDuration.CustomRange) {
    return false;
  }

  const today = dayjs();

  switch (selectedDuration) {
    case SelectedDuration.Daily:
      return currentDate.isSame(today, 'day');
    case SelectedDuration.Weekly:
      return currentDate.endOf('week').isAfter(today, 'day');
    case SelectedDuration.Monthly:
      return currentDate.endOf('month').isAfter(today, 'day');
    case SelectedDuration.Yearly:
      return currentDate.endOf('year').isAfter(today, 'day');
    default:
      return false;
  }
}, [currentDate, selectedDuration]);
  
  

const handleOptionSelect = (optionId: SelectedDuration) => {
  setSelectedDuration(optionId);
  setIsOptionsMenuOpen(false);
  setCurrentDate(dayjs());

  if (optionId === SelectedDuration.CustomRange) {
    setShowDatePicker(true);
  }
};

  const handleDatePickerCancel = () => {
    setShowDatePicker(false);
  };

  const handleDatePickerOk = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setShowDatePicker(false);
  };

  const handleRangeOptionsMenuOpen = () => {
    setIsOptionsMenuOpen(true);
  };

  const handleRangeOptionsMenuClose = () => {
    setIsOptionsMenuOpen(false);
  };

  const fetchAttendanceByTime = async (
    studentIds: string[],
    startDate: string,
    endDate: string
  ): Promise<{ [studentId: string]: { totalAttendance: number; presentAttendance: number } }> => {
    try {
      // Fetch attendance records for the students within the specified date range
      const { data: attendanceRecords, error: attendanceError } = await supabase
        .from('attendance_records')
        .select('*')
        .in('studentId', studentIds)
        .gte('date', startDate)
        .lte('date', endDate);
  
      if (attendanceError) {
        console.error('Error fetching attendance records:', attendanceError);
        return {};
      }
  
      // Initialize attendance data object
      const attendanceData: { [studentId: string]: { totalAttendance: number; presentAttendance: number } } = {};
  
      // Iterate over each student
      studentIds.forEach(studentId => {
        // Initialize total and present attendance counters for the current student
        let totalAttendance = 0;
        let presentAttendance = 0;
  
        // Filter attendance records for the current student
        const studentAttendanceRecords = attendanceRecords.filter(record => record.studentId === studentId);
  
        // Iterate over attendance records for the current student
        studentAttendanceRecords.forEach(record => {
          // Increment total attendance for each recorded session
          if (record.morningStatus !== null) totalAttendance += 0.5;
          if (record.afternoonStatus !== null) totalAttendance += 0.5;
  
          // Increment present attendance for each recorded session marked as present
          if (record.morningStatus === AttendanceStatus.Present) presentAttendance += 0.5;
          if (record.afternoonStatus === AttendanceStatus.Present) presentAttendance += 0.5;
        });
  
        // Store total and present attendance for the current student
        attendanceData[studentId] = {
          totalAttendance,
          presentAttendance,
        };
      });
  
      return attendanceData;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return {};
    }
  };
  

  const handleCategoryOptionSelect = (option: string) => {
    setSelectedFilterOption(option);
  };

  const handleOpenFilterActionsheet = () => {
    setShowFilterActionsheet(true);
    setFilterButtonPress(true)
  }

  const handleCloseFilterActionsheet = () => {
    setShowFilterActionsheet(false);
    setSelectedFilters({
      attendance: [],
      class: [],
      section: [],
    });
    setSortOption('');
    setFilterButtonPress(false);
  };

  const handleFilterOptionSelect = (category: string, option: string) => {
    const updatedFilters = { ...selectedFilters };
    const categoryFilters = updatedFilters[category];

    if (categoryFilters.includes(option)) {
      updatedFilters[category] = categoryFilters.filter((filter) => filter !== option);
    } else {
      updatedFilters[category] = [...categoryFilters, option];
    }

    setSelectedFilters(updatedFilters);

    if (category === 'class') {
      setIsClassOptionSelected(updatedFilters.class.length > 0);
    }
  };

  const handleFilterTabSelect = (tab: string) => {
    setSelectedFilterTab(tab);
  };

  const handleFilterSortOptionSelect = (option: string) => {
    setSortOption(option);
  };

  const handleFilterClear = () => {
    if (selectedFilterTab === 'Filter') {
      setSelectedFilters({
        attendance: [],
        class: [],
        section: [],
      });
    } else if (selectedFilterTab === 'Sort') {
      setSortOption('');
    }
  };

  const handleClearCategoryFilters = (category: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: [],
    }));
  };

  const handleFilterApply = () => {
    // Apply selected filters and sorting
    setShowFilterActionsheet(false);
  };

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        // Fetch all classes
        const { data: classes, error: classesError } = await supabase
          .from('classes')
          .select('id, name, section');
  
        if (classesError) {
          console.error('Error fetching classes:', classesError);
          return;
        }
  
        // Fetch all students and their class IDs
        const { data: students, error: studentsError } = await supabase
          .from('students')
          .select('id, classId');
  
        if (studentsError) {
          console.error('Error fetching students:', studentsError);
          return;
        }
  
        // Fetch attendance records for the selected date range
        const { data: attendanceRecords, error: attendanceError } = await supabase
        .from('attendance_records')
        .select('morningStatus, afternoonStatus, studentId')
        .gte('date', startDate)
        .lte('date', endDate);
  
        if (attendanceError) {
          console.error('Error fetching attendance records:', attendanceError);
          return;
        }
  
        // Create a map of class IDs to student IDs
        const classStudentsMap = new Map<string, string[]>();
        students.forEach((student) => {
          const classId = student.classId;
          if (!classStudentsMap.has(classId)) {
            classStudentsMap.set(classId, []);
          }
          classStudentsMap.get(classId)!.push(student.id);
        });
  
        // Create a map of student IDs to attendance status
        const studentAttendanceMap = new Map<string, { morning: boolean; afternoon: boolean }>();
        attendanceRecords.forEach((record) => {
          const studentId = record.studentId;
          studentAttendanceMap.set(studentId, {
            morning: record.morningStatus === AttendanceStatus.Present,
            afternoon: record.afternoonStatus === AttendanceStatus.Present,
          });
        });

        // Sort classes based on numeric order and section
        const sortedClasses = classes.sort((a, b) => {
        const classNameA = parseInt(a.name, 10);
        const classNameB = parseInt(b.name, 10);

        if (classNameA === classNameB) {
          return a.section.localeCompare(b.section);
        }

        return classNameA - classNameB;
      });
  
        // Calculate the number of days in the selected date range
      const numberOfDays = dayjs(endDate).diff(startDate, 'day') + 1;

      // Calculate class data
      const classDataResults = sortedClasses.map((classItem) => {
        const classId = classItem.id;
        const studentIds = classStudentsMap.get(classId) || [];
        const totalStudents = studentIds.length
        const totalStudentsSum = studentIds.length * numberOfDays;

        let presentStudents = 0;

        studentIds.forEach((studentId) => {
          const studentAttendanceRecords = attendanceRecords.filter(
            (record) => record.studentId === studentId
          );

          studentAttendanceRecords.forEach((record) => {
            if (record.morningStatus === AttendanceStatus.Present) presentStudents += 0.5;
            if (record.afternoonStatus === AttendanceStatus.Present) presentStudents += 0.5;
          });
        });

        const presentPercentage = totalStudentsSum > 0 ? (presentStudents / totalStudentsSum) * 100 : 0;

        return {
          classId,
          className: classItem.name,
          section: classItem.section,
          totalStudents,
          totalStudentsSum,
          presentStudents,
          presentPercentage,
        };
      });

      setClassData(classDataResults);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  fetchClassData();
}, [currentDate, startDate, endDate]);

  const handleLeftButtonClick = () => {
    setSelectedButton('left');
    // Perform any additional actions when the left button is clicked
  };

  const handleRightButtonClick = () => {
    setSelectedButton('right');
    // Perform any additional actions when the right button is clicked
  };

  return {
    currentDate,
    selectedDuration,
    handlePrevDay,
    handleNextDay,
    handleOptionSelect,
    isOptionsMenuOpen,
    handleRangeOptionsMenuOpen,
    handleRangeOptionsMenuClose,
    startDate,
    endDate,
    fetchAttendanceByTime,
    handleDatePickerCancel,
    handleDatePickerOk,
    showDatePicker,
    showFilterActionsheet,
    setShowFilterActionsheet,
    selectedFilterTab,
    selectedFilters,
    handleCloseFilterActionsheet,
    handleFilterOptionSelect,
    handleFilterTabSelect,
    handleFilterSortOptionSelect,
    handleFilterClear,
    handleFilterApply,
    selectedFilterOption,
    setSelectedFilterOption,
    sortOption,
    handleCategoryOptionSelect,
    isLoading,
    filteredAttendanceData,
    attendanceDataByTime,
    attendanceDataWithPercentage,
    isNextDisabled,
    handleCustomDateChange,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    setStartDay,
    setStartMonth,
    setStartYear,
    setEndDay,
    setEndMonth,
    setEndYear,
    isValidDay,
    isValidMonth,
    isValidYear,
    classData,
    selectedButton,
    handleLeftButtonClick,
    handleRightButtonClick,
    searchQuery,
    showSearchInput,
    handleSearchButtonClick,
    handleSearchInputChange,
    handleClearSearch,
    isClassOptionSelected,
    searchButtonPress,
    filterButtonPress,
    handleOpenFilterActionsheet,
    handleClearCategoryFilters
    };
};