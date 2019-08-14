import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './ParkingDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import humanizeDuration from 'humanize-duration';

const ONE_MINUTE = 60000; // in milliseconds
const humanizeOptions = { units: ['d', 'h', 'm'], round: true }

const getParkingPrice = ({ durationInHours, rate }) => (durationInHours * rate).toFixed(2);

const TicketField = ({ iconName, text, isLast = false }) => (
  <View style={[ styles.ticketField, isLast ? { borderBottomWidth: 0 } : null ]}>
    <View style={styles.ticketFieldLeft}><Icon name={iconName} size={24} color={styles.icon.color} /></View>
    <Text>{text}</Text>
  </View>
);

export default function TicketInfo({ vehicle, invoice, parking }) {
  const { slotNumber, dateFrom } = invoice;
  const { rate } = parking;
  const parkingDurationInMs = (Date.now() - new Date(Number(dateFrom)).getTime());
  const parkingDurationInMin = parkingDurationInMs / ONE_MINUTE;
  let [minutes, setMinutes] = useState(parkingDurationInMin);

  useEffect(() => {
    let intervalKey = setInterval(() => {
      setMinutes(minutes + 1);
    }, ONE_MINUTE);

    return () => clearInterval(intervalKey);
  });

  const parkingDurationFormatted = humanizeDuration(minutes * ONE_MINUTE, humanizeOptions);
  const vehicleName = `${vehicle.make} ${vehicle.model}, ${vehicle.plateNumber}`;
  const durationInHours = Math.ceil(minutes / 60);
  const parkingCost =  getParkingPrice({ durationInHours, rate });

  return (
    <View>
      <TicketField iconName="directions-car" text={vehicleName} />
      <TicketField iconName="local-parking" text={`Parking slot ${slotNumber}`} />
      <TicketField iconName="access-time" text={parkingDurationFormatted} />
      <TicketField iconName="attach-money" text={`$ ${parkingCost}`} isLast={true} />
    </View>
  )
}
