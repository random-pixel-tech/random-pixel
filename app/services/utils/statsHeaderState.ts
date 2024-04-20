import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { supabase } from './supabase';
import { AttendanceStatus } from './enums';
dayjs.extend(weekOfYear);

export const useStatsHeaderState = () => {
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
  });

  useEffect(() => {
    const calculateDates = () => {
      if (selectedOption === 'daily') {
        const date = currentDate.format('YYYY-MM-DD');
        setStartDate(date);
        setEndDate(date);
      } else if (selectedOption === 'weekly') {
        const startOfWeek = currentDate.startOf('week').format('YYYY-MM-DD');
        const endOfWeek = currentDate.endOf('week').format('YYYY-MM-DD');
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
      } else if (selectedOption === 'monthly') {
        const startOfMonth = currentDate.startOf('month').format('YYYY-MM-DD');
        const endOfMonth = currentDate.endOf('month').format('YYYY-MM-DD');
        setStartDate(startOfMonth);
        setEndDate(endOfMonth);
      } else if (selectedOption === 'yearly') {
        const startOfYear = currentDate.startOf('year').format('YYYY-MM-DD');
        const endOfYear = currentDate.endOf('year').format('YYYY-MM-DD');
        setStartDate(startOfYear);
        setEndDate(endOfYear);
      }
    };

    calculateDates();
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
    studentId: string,
    startDate: string,
    endDate: string
  ): Promise<{
    totalAttendance: number;
    presentAttendance: number;
  }> => {
    try {
      // Fetch attendance records for the student within the specified date range
      const { data: attendanceRecords, error: attendanceError } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('studentId', studentId)
        .gte('date', startDate)
        .lte('date', endDate);

      if (attendanceError) {
        console.error('Error fetching attendance records:', attendanceError);
        return { totalAttendance: 0, presentAttendance: 0 };
      }

      let totalAttendance = 0;
      let presentAttendance = 0;

      attendanceRecords.forEach((record) => {
        if (record.morningStatus !== null) totalAttendance += 0.5;
        if (record.afternoonStatus !== null) totalAttendance += 0.5;
        if (record.morningStatus === AttendanceStatus.Present) presentAttendance += 0.5;
        if (record.afternoonStatus === AttendanceStatus.Present) presentAttendance += 0.5;
      });

      return {
        totalAttendance,
        presentAttendance,
      };
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return { totalAttendance: 0, presentAttendance: 0 };
    }
  };

  // Missing

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption(option);
// };

// const handleClear = () => {
//   setSelectedFilters({
//     attendance: [],
//     class: [],
//   });
//   onFilterOptionSelect('attendance', '');
//   onFilterOptionSelect('class', '');
//   setSelectedOption('');
// };

// const handleApply = () => {
//   // Apply selected filters
//   Object.entries(selectedFilters).forEach(([category, options]) => {
//     options.forEach((option) => {
//       onFilterOptionSelect(category, option);
//     });
//   });

//   // Apply sorting
//   onSortOptionSelect(selectedOption);

//   // If no filters are selected, clear the filters
//   if (Object.values(selectedFilters).every((options) => options.length === 0)) {
//     setSelectedFilters({
//       attendance: [],
//       class: [],
//     });
//     onFilterOptionSelect('attendance', '');
//     onFilterOptionSelect('class', '');
//   }

//   setShowActionsheet(false);
// };

const handleCategoryOptionSelect = (option: string) => {
  setSelectedFilterOption(option);
};

  const handleCloseFilterActionsheet = () => {
    setShowFilterActionsheet(false);
    setSelectedFilters({
      attendance: [],
      class: [],
    });
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
    setSelectedFilters({
      attendance: [],
      class: [],
    });
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
    handleCategoryOptionSelect
  };
};