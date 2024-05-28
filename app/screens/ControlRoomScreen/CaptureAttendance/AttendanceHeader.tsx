import React, { useContext } from "react";
import { Box, Heading, Text } from "@gluestack-ui/themed";
import { AttendanceSession } from "../../../services/utils/enums";
import { CaptureAttendanceContext } from "../../../services/utils/api/useAttendanceLogic";

const AttendanceHeader = () => {
  const { className, section, today, session, isHoliday, markedStudents, totalStudents } =
    useContext(CaptureAttendanceContext) || {};

  const summaryKeys = Object.keys({ markedStudents, totalStudents } ?? {});

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
          {today}{" "}
          {!isHoliday &&
            `| ${session === AttendanceSession.Morning ? "Session one" : "Session two"}`}
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

export default AttendanceHeader;
