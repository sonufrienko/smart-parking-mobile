import React from 'react';
import { View, ScrollView } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';
import getOpeningHoursFormatted from '../utils/getOpeningHoursFormatted';
import styles from './ParkingDetailsStyles';
import StartParkingForm from './StartParkingForm';
import ParkingDetailsSection from './ParkingDetailsSection';

function ParkingInfo({ parking }) {
  const { title, availability, rate, address, opening_hours } = parking;
  const addressFormatted = `${address.line1},\n${address.postal_code} ${address.city}`;
  const openingHoursFormatted = getOpeningHoursFormatted(opening_hours);

  return <ParkingDetailsSection
      title={title}
      subtitle={addressFormatted}
      price={`$${rate}`}
      priceDescription='hour'
      buttomLeftText={openingHoursFormatted}
      buttomLeftTitle='Opening Hours'
      buttomRightText={availability}
      buttomRightTitle='Available Slot'
    />
}

type ParkingDetailsContainerProps = ScreenProps & {
  map: {
    selectedParkingId: number,
    parkingList: any[]
  },
  account: {
    vehicleList: any[]
  },
  parking: {
    loadingStartParking: boolean
  },
  startParking(): void
}

function ParkingDetailsContainer(props: ParkingDetailsContainerProps) {
  const { 
    map: { 
      selectedParkingId,
      parkingList }, 
    account: { 
      vehicleList 
    }, 
    parking: { 
      loadingStartParking 
    }, 
    startParking 
  } = props;

  const selectedParking = parkingList.find(item => item.id === selectedParkingId);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ParkingInfo parking={selectedParking} />
        <StartParkingForm
          isLoading={loadingStartParking}
          vehicles={vehicleList}
          onSubmit={startParking}
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
  startParking: ({ vehicleId, plateNumber, slotNumber }) => {
    const { navigation } = ownProps;
    dispatch(actions.startParking({ vehicleId, plateNumber, slotNumber, navigation }));
  }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ParkingDetailsContainer));
