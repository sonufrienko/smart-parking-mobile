import React from 'react';
import { useScreens } from 'react-native-screens';
import Amplify, { Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import awsconfig from '../../aws-exports'
import Navigation from './Navigation';
import reducers from '../reducers'

const store = createStore(reducers, applyMiddleware(thunk));

Amplify.configure(awsconfig);
Analytics.configure({ disabled: true });
useScreens();

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default withAuthenticator(App);
