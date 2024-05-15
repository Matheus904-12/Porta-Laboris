// App.js

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomHeader from './components/CustomHeader';
import CarouselImages from './components/CarouselImages';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Porta Laboris" />
      <CarouselImages />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252843',
  },
});
