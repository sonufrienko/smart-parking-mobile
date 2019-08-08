import React from 'react';
import { useScreens } from 'react-native-screens';
import Amplify, { Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from '../../aws-exports'
import Navigation from './Navigation';

Amplify.configure(awsconfig);
Analytics.configure({ disabled: true });
useScreens();

function App() {
  return (
    <Navigation />
  );
}

export default withAuthenticator(App);
