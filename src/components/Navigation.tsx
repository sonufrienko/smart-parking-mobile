import React from 'react';
import { createStackNavigator, createAppContainer, TabBarIconProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/Home';
import ParkScreen from '../screens/Park';
import AccountScreen from '../screens/Account';
import { Text } from 'react-native';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      title: 'Map'
    }
  }
);

const ParkStack = createStackNavigator(
  {
    Park: ParkScreen
  },
  {
    initialRouteName: 'Park',
    navigationOptions: {
      title: 'Park'
    },
    defaultNavigationOptions: {
      title: 'Park'
    }
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen
  },
  {
    initialRouteName: 'Account',
    navigationOptions: {
      title: 'Account'
    },
    defaultNavigationOptions: {
      title: 'Account'
    }
  }
);

const navigationIcons = new Map([
  ['HomeStack', 'place'], 
  ['ParkStack', 'local-parking'], 
  ['AccountStack', 'person']
]);

const materialBottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }: TabBarIconProps) => {
      const { routeName } = navigation.state;
      return <Icon name={navigationIcons.get(routeName)} size={20} color={tintColor} />;
    },
    shifting: false,
    initialRouteName: 'Home',
    activeColor: '#1a73e8',
    inactiveColor: 'rgba(0, 0, 0, 0.5)',
    barStyle: { backgroundColor: '#ffffff' }
  })
};

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      HomeStack,
      ParkStack,
      AccountStack
    },
    materialBottomTabNavigatorConfig
  )
);
