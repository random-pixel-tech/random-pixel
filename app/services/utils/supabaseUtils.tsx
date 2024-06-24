import { supabase } from "./supabase";

export const checkIfHoliday = async (today: string) => {
  try {
    const { data: schoolData, error: schoolError } = await supabase
      .from("school_info")
      .select("school_name")
      .single();

    if (schoolError) {
      console.error("Error fetching school data:", schoolError);
      return;
    }

    const { data: holidayData, error: holidayError } = await supabase
      .from("holidays")
      .select("*")
      .eq("school_name", schoolData.school_name)
      .gte("start_date", today)
      .lte("end_date", today)
      .limit(1); // Fetch the first row (if any)

    if (holidayError) {
      console.error("Error fetching holiday data:", holidayError);
      return false;
    } else {
      return holidayData.length > 0; // Check if the holidayData array has any elements
    }
  } catch (error) {
    console.error("Error checking holiday:", error);
    return false; // Set isHoliday to false in case of an error
  }
};
