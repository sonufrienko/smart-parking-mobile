import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';

function ParkingHistory(props: ScreenProps) {
  return (
    <View>
      <Text>Parking History List</Text>
    </View>
  );
}

export default withNavigation(ParkingHistory);
