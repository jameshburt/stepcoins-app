import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Goals = ({ setGoal }) => {
  const [dailyGoal, setDailyGoal] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Daily Step Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter daily step goal"
        keyboardType="numeric"
        value={dailyGoal}
        onChangeText={setDailyGoal}
      />
      <Button title="Set Goal" onPress={() => setGoal(dailyGoal)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%'
  }
});

export default Goals;
