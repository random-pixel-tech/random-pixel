import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

interface AttendanceData {
  label: string;
  value: number;
}

interface AttendanceBarGraphProps {
  data: AttendanceData[];
}

const AttendanceBarGraph: React.FC<AttendanceBarGraphProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: '#4286f4', // Set a consistent color for all bars
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Class-wise Attendance</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default AttendanceBarGraph;
