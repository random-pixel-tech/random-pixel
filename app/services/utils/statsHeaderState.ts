import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

export const useStatsHeaderState = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedOption, setSelectedOption] = useState('daily');
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

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
  };

  const handleOptionsMenuOpen = () => {
    setIsOptionsMenuOpen(true);
  };

  const handleOptionsMenuClose = () => {
    setIsOptionsMenuOpen(false);
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
  };
};