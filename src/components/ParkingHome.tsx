import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';

function ParkingHome(props: ScreenProps) {
  return (
    <View>
      <Text>Active parking is ...</Text>
      <Button title="Finish Parking" onPress={() => {}} />
    </View>
  );
}

export default withNavigation(ParkingHome);
