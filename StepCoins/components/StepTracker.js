import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Pedometer } from 'expo-sensors';

const StepTracker = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    const subscribe = () => {
      const subscription = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });

      Pedometer.isAvailableAsync().then(
        result => {
          setIsPedometerAvailable(String(result));
        },
        error => {
          setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
        }
      );

      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      Pedometer.getStepCountAsync(start, end).then(
        result => {
          setPastStepCount(result.steps);
        },
        error => {
          setPastStepCount('Could not get stepCount: ' + error);
        }
      );

      return () => {
        subscription && subscription.remove();
      };
    };

    subscribe();
  }, []);

  return (
    <View>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
  );
};

export default StepTracker;
