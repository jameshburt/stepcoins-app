import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepTracker from './components/StepTracker';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import { registerForPushNotificationsAsync, sendPushNotification } from './utils/notifications';

const Stack = createStackNavigator();

export default function App() {
  const [goal, setGoal] = useState(10000); // Default goal
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      sendPushNotification(expoPushToken, 'StepCoins', 'Welcome to StepCoins! Start tracking your steps today!');
    }
  }, [expoPushToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="StepTracker" component={StepTracker} />
        <Stack.Screen name="Dashboard">
          {props => <Dashboard {...props} goal={goal} />}
        </Stack.Screen>
        <Stack.Screen name="Goals">
          {props => <Goals {...props} setGoal={setGoal} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

