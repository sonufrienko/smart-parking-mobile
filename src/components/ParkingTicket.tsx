import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getOpeningHoursFormatted, getShortDateAndTime } from '../utils/dateTime';
import styles from './ParkingDetailsStyles';
import ParkingDetailsSection from './ParkingDetailsSection';
import TicketInfo from './TicketInfo';
import { Parking, Invoice, ParkingState, MapState, AccountState } from '../types';

function ParkingInfo({ parking, invoice }: { parking: Parking, invoice: Invoice }) {
  const { title, rate, address, openingHours } = parking;
  const addressFormatted = `${address.line1},\n${address.postalCode} ${address.city}`;
  const openingHoursFormatted = getOpeningHoursFormatted(openingHours);
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

type ParkingTicketContainerProps = {
  parking: ParkingState
  map: MapState,
  account: AccountState,
  finishParking(): void
}

function ParkingTicketContainer(props: ParkingTicketContainerProps) {
  const { 
    parking: { 
      activeTicket,
      loadingFinishParking
    },
    map: {
      parkingList 
    }, 
    account: {
      user: { vehicles }
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

  const parkingForInvoice = parkingList.find(item => item.parkingID === activeTicket.parkingID);
  const vehicleForInvoice = vehicles.find(item => item.plateNumber === activeTicket.plateNumber);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ParkingInfo parking={parkingForInvoice} invoice={activeTicket} />
        <TicketInfo vehicle={vehicleForInvoice} invoice={activeTicket} parking={parkingForInvoice} />
        <Button 
          disabled={loadingFinishParking}
          title="Finish Parking" 
          onPress={finishParking} 
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({ map, account, parking }) => ({ map, account, parking });

const mapDispatchToProps = (dispatch, ownProps) => ({
  finishParking: () => {
    dispatch(actions.finishParking());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ParkingTicketContainer));
