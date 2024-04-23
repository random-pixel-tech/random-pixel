import React, { useEffect } from 'react';
import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { supabase } from '../services/utils/supabase';
import ClassAttendanceCard from '../components/ClassAttendanceCard';
import { useAttendanceStats } from '../services/utils/api/useAttendanceStats';
import ToggleButtons from '../components/ToggleButtons';

const Home: React.FC = () => {
  // const { classData } = useAttendanceStats();

  return (
    <Box h="100%">
      <Text>Home Screen</Text>
      {/* <ScrollView>
      {classData.map((data) => (
        <ClassAttendanceCard key={data.classId} classData={data} />
      ))}
      </ScrollView> */}
<ToggleButtons
        leftButtonLabel="Left Button"
        rightButtonLabel="Right Button"
        onLeftButtonClick={() => console.log('Left button clicked')}
        onRightButtonClick={() => console.log('Right button clicked')}
      />
          </Box>
  );
};

export default Home;