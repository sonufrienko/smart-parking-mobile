import React from 'react';
import ParkingTicket from '../components/ParkingTicket';

function ParkingHomeScreen() {
  return (
    <ParkingTicket />
  );
}

ParkingHomeScreen.navigationOptions = {
  title: 'Parking Ticket'
};

export default ParkingHomeScreen;
