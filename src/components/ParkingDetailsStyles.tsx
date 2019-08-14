import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  infoHead: {
    flex: 1, 
    flexDirection: 'row',
    marginBottom: 20
  },
  infoHeadLeft: {
    width: '69%',
    marginRight: '1%'
  },
  infoHeadRight: {
    width: '29%',
    alignItems: 'center'
  },
  infoHeadTitle: {
    fontSize: 24
  },
  infoHeadPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  infoBottom: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 40,
    borderBottomWidth: 1, 
    borderTopWidth: 1, 
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10
  },
  infoBottomHint: {
    color: '#acacac',
    textTransform: 'uppercase',
    fontSize: 10
  },
  infoBottomLeft: {
    width: '48%',
    marginRight: '1%'
  },
  infoBottomRight: {
    width: '46%'
  },
  infoBottomSeparator: {
    width: '6%',
    borderLeftColor: '#ccc',
    borderLeftWidth: 1
  },
  formSlotNumber: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderColor: 'rgba(0, 0, 0, 0.1)', 
    borderWidth: 1,
    padding: 10,
    fontSize: 24,
    borderRadius: 4,
    width: '50%'
  },
  formVehicleSelect: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  },
  ticketField: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingTop: 4,
    paddingBottom: 14,
    marginBottom: 10
  },
  ticketFieldLeft: {
    width: 50
  },
  icon: {
    color: '#607D8B'
  },
  grayColor: {
    color: '#acacac'
  },
  boldText: {
    fontWeight: 'bold'
  }
});
