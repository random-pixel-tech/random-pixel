import React, { useEffect } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { supabase } from '../services/utils/supabase';

const Home: React.FC = () => {
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Log Supabase client initialization
        console.log('Supabase client:', supabase);

        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select('*');

        if (classesError) {
          console.error('Error fetching classes:', classesError);
          return;
        }

        console.log('Fetched classes data:', classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <Box h="100%">
      <Text>Home Screen</Text>
    </Box>
  );
};

export default Home;
