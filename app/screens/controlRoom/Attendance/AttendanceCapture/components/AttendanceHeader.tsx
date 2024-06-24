import React, { useContext } from "react";
import { Box, Heading, Text } from "@gluestack-ui/themed";
import { AttendanceSession } from "../../../../../services/utils/enums";
import { CaptureAttendanceContext } from "../../../../../services/utils/api/useAttendanceLogic";
import { useDateAndTimeUtil } from "../../../../../services/utils/dateAndTimeUtils";

const AttendanceCaptureHeader = () => {
  const {
    className,
    section,
    session,
    isHoliday,
    markedStudents,
    totalStudents,
  } = useContext(CaptureAttendanceContext) || {};
  const { currentDay } = useDateAndTimeUtil();

  return (
    <Box
      bg="$pixSecondary"
      w="$full"
      h="$20"
      alignItems="center"
      p="$4"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Box>
        <Heading fontSize="$lg">
          Class: {className} {section}
        </Heading>
        <Text fontSize="$md">
          {currentDay}{" "}
          {!isHoliday &&
            `| ${
              session === AttendanceSession.Morning
                ? "Session one"
                : "Session two"
            }`}
        </Text>
      </Box>
      {!isHoliday && (
        <Box>
          <Heading fontSize="$lg" alignSelf="flex-end">
            {`${markedStudents} / ${totalStudents}`}
          </Heading>
          <Text fontSize="$md">Summary</Text>
        </Box>
      )}
    </Box>
  );
};

export default AttendanceCaptureHeader;
