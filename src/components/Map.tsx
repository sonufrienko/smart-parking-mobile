import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    marginBottom: 10
  }
});

type Parking = {
  id: number,
  title: string
}

type MapProps = {
  parkingList: Parking[],
  onParkingSelect(parking: Parking): void
}

type MapMarkerProps = {
  parking: Parking,
  onParkingSelect(parking: Parking): void
}

function MapMarker({ parking, onParkingSelect }: MapMarkerProps) {
  return (
    <View style={styles.marker}>
      <Button
        title={parking.title} 
        onPress={() => onParkingSelect(parking)} />
    </View>
  );
}

function Map({ parkingList, onParkingSelect }: MapProps) {
  return (
    <View style={styles.container}>
      {parkingList.map(parking => <MapMarker key={parking.id} parking={parking} onParkingSelect={onParkingSelect} />)}
    </View>
  );
}

function MapContainer(props: ScreenProps) {
  const { navigation, map: { parkingList }, selectParking } = props;

  return <Map 
    parkingList={parkingList} 
    onParkingSelect={parking => {
      selectParking(parking.id);
      navigation.navigate('ParkingDetails');
    }} 
  />
}

const mapStateToProps = ({ map }) => ({ map });

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectParking: (parkingId) => {
    dispatch(actions.selectParking(parkingId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MapContainer));
