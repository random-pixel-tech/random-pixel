import React, { useState } from "react";
import { Box } from "@gluestack-ui/themed";
import AttendanceStatsProvider from "../../../../providers/attendanceStatsProvider";
import StatsHeader from "./components/StatsHeader";
import StatsSearchAndFilterBar from "./components/StatsSearchAndFilterBar";
import AttendanceStatsList from "./components/AttendanceStatsList";

const AttendanceStats = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(true);

  return (
    <AttendanceStatsProvider>
      <Box bg="$pixWhite" w="$full" h="$full">
        <StatsHeader title="Attendance" />
        {isSearchBarVisible && <StatsSearchAndFilterBar />}
        <AttendanceStatsList showSearchBar={setSearchBarVisible} />
      </Box>
    </AttendanceStatsProvider>
  );
};

export default AttendanceStats;
