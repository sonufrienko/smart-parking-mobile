import React from 'react';
import Navigation from './Navigation';
import { useScreens } from 'react-native-screens';

useScreens();

export default function App() {
  return (
    <Navigation />
  );
}
