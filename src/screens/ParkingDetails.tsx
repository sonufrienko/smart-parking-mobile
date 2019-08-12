import React from 'react';
import ParkingDetails from '../components/ParkingDetails';

function ParkingDetailsScreen() {
  return (
    <ParkingDetails />
  );
}

ParkingDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Parking Details'
});

export default ParkingDetailsScreen;