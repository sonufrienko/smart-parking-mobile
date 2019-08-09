import React from 'react';
import Map from '../components/Map';

function MapHomeScreen() {
  return (
    <Map />
  );
}

MapHomeScreen.navigationOptions = {
  header: null,
  title: 'Map'
}

export default MapHomeScreen;