import React from 'react';
import { createAppContainer, TabBarIconProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/Home';
import ParkScreen from '../screens/Park';
import AccountScreen from '../screens/Account';

const navigationIcons = new Map([
  ['Home', 'place'],
  ['Park', 'local-parking'],
  ['Account', 'person'],
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
      Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
          title: 'Map'
        })
      },
      Park: {
        screen: ParkScreen,
        navigationOptions: () => ({
          title: 'Park'
        })
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: () => ({
          title: 'Account'
        })
      }
    },
    materialBottomTabNavigatorConfig
  )
);
