import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ParkingTicket from '../components/ParkingTicket';
import ParkingHistory from '../components/ParkingHistory';
import { ParkingState } from '../types';

function ParkingHomeScreen({ parking, navigation }: { parking: ParkingState; navigation: any }) {
  useEffect(() => {
    navigation.setParams({ title: parking.activeTicket ? 'Parking Ticket' : 'Parking History' });
  }, [parking]);

  return parking.activeTicket ? <ParkingTicket /> : <ParkingHistory />;
}

ParkingHomeScreen.navigationOptions = props => ({
  title: props.navigation.getParam('title') || '111'
});

const mapStateToProps = ({ parking }) => ({ parking });
export default connect(mapStateToProps, null)(ParkingHomeScreen);
