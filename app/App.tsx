import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App: FC = () => (
  <View style={styles.container}>
    <Text>Hello world!</Text>
    <StatusBar />
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
