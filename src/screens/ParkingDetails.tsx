import React from 'react';
import ParkingDetails from '../components/ParkingDetails';

function ParkingDetailsScreen() {
  return (
    <ParkingDetails />
  );
}

ParkingDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.parking.title
});

export default ParkingDetailsScreen;