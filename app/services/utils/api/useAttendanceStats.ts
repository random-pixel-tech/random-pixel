import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { supabase } from '../supabase';
import { AttendanceStatus } from '../enums';
import useStudentAttendance, { AllStudentAttendanceData } from './useStudentAttendance';

dayjs.extend(weekOfYear);

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

export const useAttendanceStats = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedOption, setSelectedOption] = useState('daily');
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [showDatePicker, setShowDatePicker] = useState(false);

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
  if (!sortOption) return attendanceDataWithPercentage;

  // Sort function based on the selected option
  const sortFunction = (a: StudentAttendanceDataWithPercentage, b: StudentAttendanceDataWithPercentage) => {
    switch (sortOption) {
      case 'Name: A to Z':
        return a.student.name.localeCompare(b.student.name);
      case 'Name: Z to A':
        return b.student.name.localeCompare(a.student.name);
      case 'Attendance Percentage: Low to High':
        return a.attendancePercentage - b.attendancePercentage;
      case 'Attendance Percentage: High to Low':
        return b.attendancePercentage - a.attendancePercentage;
      case 'Class: Low to High':
        return a.className.localeCompare(b.className);
      case 'Class: High to Low':
        return b.className.localeCompare(a.className);
      default:
        return 0;
    }
  };

  // Sort only if the sort option has changed
  return [...attendanceDataWithPercentage].sort(sortFunction);
}, [attendanceDataWithPercentage, sortOption]);


// Filter attendance data based on the selected filters
const filteredAttendanceData = useMemo(() => {
  // Filter function to check if a data point matches the selected filters
  const filterFunction = (data: StudentAttendanceDataWithPercentage) => {
    const percentage = data.attendancePercentage;
    const className = data.className;
    const section = data.section;

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

    return matchesAttendanceFilter && matchesClassFilter && matchesSectionFilter;
  };

  // Apply filters only if any filters are selected
  if (
    (!selectedFilters.attendance || selectedFilters.attendance.length === 0) &&
    (!selectedFilters.class || selectedFilters.class.length === 0) &&
    (!selectedFilters.section || selectedFilters.section.length === 0) // Check if there's any section selected
  ) {
    return sortedAttendanceData; // No filters selected, return sorted data directly
  } else {
    return sortedAttendanceData.filter(filterFunction);
  }
}, [sortedAttendanceData, selectedFilters]);

useEffect(() => {
  const dateRanges: Record<string, [string, string]> = {
    daily: [currentDate.format('YYYY-MM-DD'), currentDate.format('YYYY-MM-DD')],
    weekly: [currentDate.startOf('week').format('YYYY-MM-DD'), currentDate.endOf('week').format('YYYY-MM-DD')],
    monthly: [currentDate.startOf('month').format('YYYY-MM-DD'), currentDate.endOf('month').format('YYYY-MM-DD')],
    yearly: [currentDate.startOf('year').format('YYYY-MM-DD'), currentDate.endOf('year').format('YYYY-MM-DD')],
  };

  const [startDate, endDate] = dateRanges[selectedOption] || [currentDate.format('YYYY-MM-DD'), currentDate.format('YYYY-MM-DD')];
  setStartDate(startDate);
  setEndDate(endDate);
}, [currentDate, selectedOption]);


  const handlePrevDay = () => {
    if (selectedOption === 'daily') {
      setCurrentDate(currentDate.subtract(1, 'day'));
    } else if (selectedOption === 'weekly') {
      setCurrentDate(currentDate.subtract(1, 'week'));
    } else if (selectedOption === 'monthly') {
      setCurrentDate(currentDate.subtract(1, 'month'));
    } else if (selectedOption === 'yearly') {
      setCurrentDate(currentDate.subtract(1, 'year'));
    }
  };

  

  const handleNextDay = () => {
    if (selectedOption === 'daily') {
      setCurrentDate(currentDate.add(1, 'day'));
    } else if (selectedOption === 'weekly') {
      setCurrentDate(currentDate.add(1, 'week'));
    } else if (selectedOption === 'monthly') {
      setCurrentDate(currentDate.add(1, 'month'));
    } else if (selectedOption === 'yearly') {
      setCurrentDate(currentDate.add(1, 'year'));
    }
  };

  const isNextDisabled = useMemo(() => {
    if (selectedOption === 'customRange') {
      return false;
    }
  
    const currentDateFormatted = currentDate.format('YYYY-MM-DD');
  
    switch (selectedOption) {
      case 'daily':
        return currentDate.format('YYYY-MM-DD') >= currentDateFormatted;
      case 'weekly':
        return currentDate.endOf('week').format('YYYY-MM-DD') >= currentDateFormatted;
      case 'monthly':
        return currentDate.endOf('month').format('YYYY-MM-DD') >= currentDateFormatted;
      case 'yearly':
        return currentDate.endOf('year').format('YYYY-MM-DD') >= currentDateFormatted;
      default:
        return false;
    }
  }, [currentDate, selectedOption]);
  

  const handleOptionSelect = (optionId: string) => {
    console.log('Selected option:', optionId);
    setSelectedOption(optionId);
    setIsOptionsMenuOpen(false);
    setCurrentDate(dayjs());

    if (optionId === 'customRange') {
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

  const handleOptionsMenuOpen = () => {
    setIsOptionsMenuOpen(true);
  };

  const handleOptionsMenuClose = () => {
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

  const handleCloseFilterActionsheet = () => {
    setShowFilterActionsheet(false);
    setSelectedFilters({
      attendance: [],
      class: [],
      section: [],
    });
    setSortOption('');
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

  const handleFilterApply = () => {
    // Apply selected filters and sorting
    setShowFilterActionsheet(false);
  };

  return {
    currentDate,
    selectedOption,
    handlePrevDay,
    handleNextDay,
    handleOptionSelect,
    isOptionsMenuOpen,
    handleOptionsMenuOpen,
    handleOptionsMenuClose,
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
    };
};