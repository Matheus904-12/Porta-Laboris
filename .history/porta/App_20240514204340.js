// App.js

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomHeader from './components/CustomHeader';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Porta Laboris" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
