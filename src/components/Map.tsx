import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import * as actions from '../actions';

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    width: '100%',
    height: Constants.statusBarHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})

type Parking = {
  id: number,
  title: string
  location: {
    latitude: number,
    longitude: number
  }
}

type MapProps = {
  parkingList: Parking[],
  onParkingSelect(e: {
    nativeEvent: {
      id: string
    }
  }): void
}

function Map({ parkingList, onParkingSelect }: MapProps) {
  const amsterdamLocation = {
    latitude: 52.3783,
    longitude: 4.8955,
    latitudeDelta: 0.0212,
    longitudeDelta: 0.0172
  };

  const [location, setLocation] = useState();
  const [region, setRegion] = useState(amsterdamLocation);

  // JUST FOR DEMO - use Amsterdam location instead of my current
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

  //   if(!location) {
  //     getLocation();
  //   }
  // });

  return (
    <View>
      <MapView style={{ width: '100%', height: '100%' }} region={region}>
        {parkingList.map(parking => (
          <Marker
            key={parking.id}
            identifier={parking.id.toString()}
            onPress={onParkingSelect}
            pinColor='red'
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
      const parkingId = Number(e.nativeEvent.id);
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
