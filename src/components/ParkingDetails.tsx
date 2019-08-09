import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';

function ParkingDetails(props: ScreenProps) {
  const { navigation } = props;
  const parking = navigation.getParam('parking', {});

  return (
    <View>
      <Text>Start parking on {parking.title}.</Text>
      <Button
        title="Start Parking"
        onPress={() => {
          navigation.popToTop();
          navigation.navigate('ParkingHome', { parking });
        }}
      />
    </View>
  );
}

export default withNavigation(ParkingDetails);
