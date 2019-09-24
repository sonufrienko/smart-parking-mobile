import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { User, AccountState } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Account({ account }: { account: AccountState }) {
  const user = account.user;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <UserDetails user={user} />
      <VehicleList user={user} />
    </ScrollView>
  )
}

function UserDetails({ user: { userID, fullName, email, phone } }: { user: User }) {
  return (
    <View>
      <Text>ID: {userID}</Text>
      <Text>Name: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
    </View>
  )
}

function VehicleList({ user: { vehicles } }: { user: User }) {
  return (
    <View>
      {vehicles.map(item => <Text>{item.make} {item.model}, {item.plateNumber}</Text>)}
    </View>
  )
}

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, null)(withNavigation(Account));
