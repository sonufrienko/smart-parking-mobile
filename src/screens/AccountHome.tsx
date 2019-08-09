import React from 'react';
import Account from '../components/Account';

function AccountHomeScreen() {
  return (
    <Account />
  );
}

AccountHomeScreen.navigationOptions = {
  title: 'Account'
};

export default AccountHomeScreen;