import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { ScreenProps, withNavigation } from 'react-navigation';

const styles = {
  screen: {
    backgroundColor: '#ccc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

function Map(props: ScreenProps) {
  const { navigation } = props;

  const parking = {
    id: 1001,
    title: 'Amsterdam Central Parking'
  };

  return (
    <View style={styles.screen}>
      <Button title="Park here" onPress={() => navigation.navigate('ParkingDetails', { parking })} />
    </View>
  );
}

export default withNavigation(Map);
