import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

type UserDetailsProps = {
  user: {
    id: string,
    email: string,
    phone: string
  }
}

function AccountContainer({ account }) {
  const user = account.user;
  return <UserDetails user={user} />
}

function UserDetails({ user: { id, email, phone } }: UserDetailsProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View>
        <Text>ID: {id}</Text>
        <Text>Email: {email}</Text>
        <Text>Phone: {phone}</Text>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, null)(withNavigation(AccountContainer));
