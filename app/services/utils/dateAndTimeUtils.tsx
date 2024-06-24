import React from "react";
import { checkIfHoliday } from "./supabaseUtils";

export const useDateAndTimeUtil = () => {
  const [currentDay, setCurrentDay] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [isDayHoliday, setIsDayHoliday] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const fetchHolidayStatus = async () => {
      try {
        const result = (await checkIfHoliday(currentDay)) ?? false;
        setIsDayHoliday(result);
      } catch (error) {
        console.error("Error checking holiday status:", error);
        setIsDayHoliday(false); // Default to false or handle as needed
      }
    };

    fetchHolidayStatus();
  }, [currentDay]);

  return { currentDay, setCurrentDay, isDayHoliday };
};
