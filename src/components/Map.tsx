import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Parking } from '../types';
import { getOpeningHoursFormatted } from '../utils/dateTime';

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    width: '100%',
    height: Constants.statusBarHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})

type MapProps = {
  parkingList: Array<Parking> | null,
  onParkingSelect(e: {
    nativeEvent: {
      id: string
    }
  }): void
}

function Map({ parkingList, onParkingSelect }: MapProps) {
  const [location, setLocation] = useState();

  const initialRegion = { 
    latitude: 37.787653, 
    longitude: -122.420211,
    latitudeDelta: 0.0066,
    longitudeDelta: 0.0066
  };

  // TODO: Future feature
  // useEffect(() => {
  //   async function getLocation() {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== 'granted') {
  //       alert('Permission to access location was denied');
  //     }
  
  //     // TODO: use Location.watchPositionAsync()
  //     let currentLocation = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.BestForNavigation
  //     });

  //     setLocation({ 
  //       latitude: currentLocation.coords.latitude,
  //       longitude: currentLocation.coords.longitude
  //     });
  //   }

  //   getLocation();
  // }, []);

  return (
    <View>
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {parkingList.map(parking => (
          <Marker
            key={parking.parkingID}
            identifier={parking.parkingID}
            onPress={onParkingSelect}
            pinColor={getOpeningHoursFormatted(parking.openingHours) === 'Closed' ? 'tan' : 'red'}
            coordinate={parking.location}
          />
          )
        )}
      </MapView>
      <View style={styles.statusBar}></View>
    </View>
  );
}

function MapContainer(props: ScreenProps) {
  const { navigation, map: { parkingList }, selectParking } = props;

  return <Map 
    parkingList={parkingList} 
    onParkingSelect={e => {
      const parkingId = e.nativeEvent.id;
      selectParking(parkingId);
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
