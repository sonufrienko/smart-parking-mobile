import React from 'react';
import ParkingHistory from '../components/ParkingHistory';

function ParkingHistoryScreen() {
  return (
    <ParkingHistory />
  );
}

ParkingHistoryScreen.navigationOptions = {
  title: 'Parking History'
};

export default ParkingHistoryScreen;
