import React from 'react';
import { createStackNavigator, createAppContainer, TabBarIconProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MapHomeScreen from '../screens/MapHome';
import ParkingHomeScreen from '../screens/ParkingHome';
import AccountHomeScreen from '../screens/AccountHome';
import ParkingDetailsScreen from '../screens/ParkingDetails';
import VehicleListScreen from '../screens/VehicleList';
import PaymentListScreen from '../screens/PaymentList';

const DEFAULT_NAVIGATION_OPTIONS = {
  headerStyle: {
    backgroundColor: '#1a73e8',
  },
  headerTintColor: '#fff',
};

const MapStack = createStackNavigator(
  {
    MapHome: MapHomeScreen,
    ParkingDetails: ParkingDetailsScreen
  },
  {
    initialRouteName: 'MapHome',
    navigationOptions: {
      title: 'Map'
    },
    defaultNavigationOptions: DEFAULT_NAVIGATION_OPTIONS,
  }
);

const ParkingStack = createStackNavigator(
  {
    ParkingHome: ParkingHomeScreen
  },
  {
    initialRouteName: 'ParkingHome',
    navigationOptions: {
      title: 'Parking'
    },
    defaultNavigationOptions: DEFAULT_NAVIGATION_OPTIONS,
  }
);

const AccountStack = createStackNavigator(
  {
    AccountHome: AccountHomeScreen,
    VehicleList: VehicleListScreen,
    PaymentList: PaymentListScreen
  },
  {
    initialRouteName: 'AccountHome',
    navigationOptions: {
      title: 'Account'
    },
    defaultNavigationOptions: DEFAULT_NAVIGATION_OPTIONS,
  }
);

const navigationIcons = new Map([
  ['MapStack', 'place'], 
  ['ParkingStack', 'local-parking'], 
  ['AccountStack', 'person']
]);

const materialBottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }: TabBarIconProps) => {
      const { routeName } = navigation.state;
      return <Icon name={navigationIcons.get(routeName)} size={20} color={tintColor} />;
    },
    shifting: false,
    initialRouteName: 'MapHome',
    activeColor: '#1a73e8',
    inactiveColor: 'rgba(0, 0, 0, 0.5)',
    barStyle: { backgroundColor: '#ffffff' }
  })
};

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      MapStack,
      ParkingStack,
      AccountStack
    },
    materialBottomTabNavigatorConfig
  )
);
