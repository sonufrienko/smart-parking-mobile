import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getOpeningHoursFormatted, getShortDateAndTime } from '../utils/dateTime';
import styles from './ParkingDetailsStyles';
import ParkingDetailsSection from './ParkingDetailsSection';
import TicketInfo from './TicketInfo';

function ParkingInfo({ parking, invoice }) {
  const { title, rate, address, opening_hours } = parking;
  const addressFormatted = `${address.line1},\n${address.postal_code} ${address.city}`;
  const openingHoursFormatted = getOpeningHoursFormatted(opening_hours);
  const parkingStartTimeFormatted = getShortDateAndTime(invoice.dateFrom);

  return <ParkingDetailsSection
    title={title}
    subtitle={addressFormatted}
    price={`$${rate}`}
    priceDescription='hour'
    buttomLeftText={openingHoursFormatted}
    buttomLeftTitle='Opening Hours'
    buttomRightText={parkingStartTimeFormatted}
    buttomRightTitle='Enter'
  />
}

function ParkingTicketContainer(props: ScreenProps) {
  const { 
    parking: { 
      activeTicket,
      loadingFinishParking
    },
    map: {
      parkingList 
    }, 
    account: {
      vehicleList
    },
    finishParking
  } = props;

  if (!activeTicket) {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You don't have an active parking ticket.</Text>
      </View>
    );
  }

  const parkingForInvoice = parkingList.find(item => item.id === activeTicket.parkingId);
  const vehicleForInvoice = vehicleList.find(item => item.id === activeTicket.vehicleId);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ParkingInfo parking={parkingForInvoice} invoice={activeTicket} />
        <TicketInfo vehicle={vehicleForInvoice} invoice={activeTicket} parking={parkingForInvoice} />
        <Button 
          disabled={loadingFinishParking}
          title="Finish Parking" 
          onPress={() => {
            finishParking();
          }} 
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({ map, account, parking }) => ({ map, account, parking });

const mapDispatchToProps = (dispatch, ownProps) => ({
  finishParking: () => {
    alert('Finish');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ParkingTicketContainer));
