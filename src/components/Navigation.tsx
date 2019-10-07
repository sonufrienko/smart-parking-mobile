import React from 'react';
import { createStackNavigator, createAppContainer, TabBarIconProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MapHomeScreen from '../screens/MapHome';
import ParkingHomeScreen from '../screens/ParkingHome';
import AccountHomeScreen from '../screens/AccountHome';
import ParkingDetailsScreen from '../screens/ParkingDetails';
import ParkingHistoryScreen from '../screens/ParkingHistory';
import VehicleListScreen from '../screens/VehicleList';
import PaymentListScreen from '../screens/PaymentList';

const MapStack = createStackNavigator(
  {
    MapHome: MapHomeScreen,
    ParkingDetails: ParkingDetailsScreen
  },
  {
    initialRouteName: 'MapHome',
    navigationOptions: {
      title: 'Map'
    }
  }
);

const ParkingStack = createStackNavigator(
  {
    ParkingHome: ParkingHomeScreen,
    ParkingHistory: ParkingHistoryScreen
  },
  {
    initialRouteName: 'ParkingHome',
    navigationOptions: {
      title: 'Parking'
    }
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
    }
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
