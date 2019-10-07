import React from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { User, AccountState } from '../types';

const ACCOUNT_ROUTES = [
  {
    title: 'Vehicles',
    route: 'VehicleList'
  }, {
    title: 'Payment Methods',
    route: 'PaymentList'
  }
]

type Route = {
  title: string,
  route: string
}

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
    justifyContent: 'space-between'
  }
});

function Account({ account }: { account: AccountState }) {
  const user = account.user;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {user && <UserDetails user={user} />}
      {user && <UserMenuWithNavigation routes={ACCOUNT_ROUTES} />}
    </ScrollView>
  )
}

function UserDetails({ user: { fullName, email, phone } }: { user: User }) {
  return (
    <View style={styles.details}>
      <Text style={{ fontSize: 24 }}>{fullName}</Text>
      <Text style={styles.grayColor}>{email}</Text>
      <Text style={styles.grayColor}>Phone: {phone}</Text>
    </View>
  )
}

function UserMenuItem({ title, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.item}>
        <Text>{title}</Text>
        <View><Icon name="chevron-right" size={26} /></View>
      </View>
    </TouchableNativeFeedback>
  )
}

function UserMenu({ routes, navigation }: { routes: Route[], navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={routes}
        renderItem={({ item }) => (
          <UserMenuItem
            title={item.title}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
        keyExtractor={route => route.route}
      />
    </SafeAreaView>
  )
}

const UserMenuWithNavigation = withNavigation(UserMenu);

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, null)(Account);
