import React from 'react';
import { View, ScrollView } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getOpeningHoursFormatted } from '../utils/dateTime';
import styles from './ParkingDetailsStyles';
import StartParkingForm from './StartParkingForm';
import ParkingDetailsSection from './ParkingDetailsSection';
import { Parking, CreateInvoiceMutationVariables, MapState, AccountState, ParkingState } from '../types'

function ParkingInfo({ parking }: { parking: Parking }) {
  const { title, rate, address, openingHours, freeSlots } = parking;
  const addressFormatted = `${address.line1},\n${address.postalCode} ${address.city}`;
  const openingHoursFormatted = getOpeningHoursFormatted(openingHours);

  return <ParkingDetailsSection
      title={title}
      subtitle={addressFormatted}
      price={`$${rate}`}
      priceDescription='hour'
      buttomLeftText={openingHoursFormatted}
      buttomLeftTitle='Opening Hours'
      buttomRightText={freeSlots}
      buttomRightTitle='Available Slot'
    />
}

type ParkingDetailsContainerProps = ScreenProps & {
  map: MapState,
  account: AccountState,
  parking: ParkingState,
  startParking(data: CreateInvoiceMutationVariables): void
}

function ParkingDetailsContainer(props: ParkingDetailsContainerProps) {
  const { 
    map: { 
      selectedParkingId,
      parkingList 
    }, 
    account: { 
      user: { vehicles }
    }, 
    parking: { 
      loadingStartParking 
    }, 
    startParking 
  } = props;

  const selectedParking = parkingList.find(item => item.parkingID === selectedParkingId);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ParkingInfo parking={selectedParking} />
        <StartParkingForm
          isLoading={loadingStartParking}
          vehicles={vehicles}
          onSubmit={startParking}
          selectedParkingId={selectedParkingId}
          buttonTitle='Start Parking'
          slotNumberTitle='Parking slot number'
          vehicleSelectTitle='Select a vehicle'
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({ map, account, parking }) => ({ map, account, parking });

const mapDispatchToProps = (dispatch, ownProps) => ({
  startParking: (data: CreateInvoiceMutationVariables) => {
    const { navigation } = ownProps;
    dispatch(actions.startParking({ navigation, data }));
  }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ParkingDetailsContainer));
