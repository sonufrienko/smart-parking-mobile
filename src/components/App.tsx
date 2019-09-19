import React, { useEffect } from 'react';
import { useScreens } from 'react-native-screens';
import Amplify, { Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import awsconfig from '../../aws-exports'
import Navigation from './Navigation';
import reducers from '../reducers'
import * as actions from '../actions';

const store = createStore(reducers, applyMiddleware(thunk));

Amplify.configure(awsconfig);
Analytics.configure({ disabled: true });
useScreens();

function App() {
  useEffect(() => {
    store.dispatch(actions.fetchUser());
    store.dispatch(actions.fetchParkingList());
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default withAuthenticator(App);
