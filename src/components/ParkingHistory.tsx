import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AccountState, Invoice, MapState, Parking } from '../types';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  details: {
    padding: 20
  },
  grayColor: {
    color: '#acacac'
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    alignItems: 'center',
  },
  leftColumn: {
    width: 40
  },
  centerColumn: {
    flexGrow: 1
  },
  rightColumn: {
    width: 60
  },
  date: {
    fontSize: 16
  },
  price: {
    fontWeight: 'bold',
    color: '#4CAF50'
  }
});

function InvoiceListItem({ invoice, parkingList, onPress }: { invoice: Invoice, parkingList: Array<Parking>, onPress: () => any }) {
  const parkingStartTimeFormatted = dayjs(Number(invoice.dateFrom)).format('ddd, MMM D, h:mm a');
  const parking = parkingList.find(p => p.parkingID === invoice.parkingID);

  if (!parking)
    return null;

  const parkingName = parking.title;
  const price = Number(invoice.price).toFixed(2);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.leftColumn}>
          <Icon name="access-time" size={24} color="#607D8B" />
        </View>
        <View style={styles.centerColumn}>
            <View><Text style={styles.date}>{parkingStartTimeFormatted}</Text></View>
            <View><Text>{parkingName}</Text></View>
        </View>
        <View style={styles.rightColumn}>
            <Text style={styles.price}>{`$${price}`}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

function InvoiceList({ invoices, parkingList }: { invoices: Array<Invoice>, parkingList: Array<Parking> }) {
  const [ selectedInvoiceID, selectInvoice ] = useState(null);
  // TODO: Expand invoice

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={invoices}
        renderItem={({ item }) => (
          <InvoiceListItem
            invoice={item}
            parkingList={parkingList}
            onPress={() => selectInvoice(item.invoiceID)}
          />
        )}
        keyExtractor={invoice => invoice.invoiceID}
      />
    </SafeAreaView>
  )
}

function ParkingHistory({ account, map }: { account: AccountState, map: MapState }) {
  const user = account.user;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {user && <InvoiceList invoices={user.invoices} parkingList={map.parkingList} />}
    </ScrollView>
  )
}

const mapStateToProps = ({ account, map }) => ({ account, map });
export default connect(mapStateToProps, null)(ParkingHistory);
