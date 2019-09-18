import { ActionType } from '../types';

const initialState = {
  location: null,
  selectedParkingId: null,
  parkingList: [{
    id: 1001,
    title: 'Amsterdam Central Parking',
    availability: 267,
    features: [ 'Electric Car Charging' ],
    rate: 5,
    location: {
      latitude: 52.378645,
      longitude: 4.896876
    },
    address: {
      country_code: 'NL',
      state: 'North Holland',
      city: 'Amsterdam',
      postal_code: '95131 TL',
      line1: 'Prins Hendrikkade 20A',
      line2: ''
    },
    opening_hours: [
      {
        open: {
          day: 0,
          time: '0600'
        },
        close: {
          day: 0,
          time: '2300'
        }
      }, {
        open: {
          day: 1,
          time: '0600'
        },
        close: {
          day: 1,
          time: '2300'
        }
      }, {
        open: {
          day: 2,
          time: '0600'
        },
        close: {
          day: 2,
          time: '2300'
        }
      }, {
        open: {
          day: 3,
          time: '0700'
        },
        close: {
          day: 3,
          time: '2030'
        }
      }, {
        open: {
          day: 4,
          time: '0700'
        },
        close: {
          day: 4,
          time: '2030'
        }
      }
    ]
  }, {
    id: 1002,
    title: 'Q-Park Nieuwendijk',
    availability: 12,
    features: [],
    rate: 4,
    location: {
      latitude: 52.376381,
      longitude: 4.894599
    },
    address: {
      country_code: 'NL',
      state: 'North Holland',
      city: 'Amsterdam',
      postal_code: '1012 PV',
      line1: 'Nieuwezijds Kolk 18',
      line2: ''
    },
    opening_hours: [
      {
        open: {
          day: 0,
          time: '0000'
        }
      }, {
        open: {
          day: 1,
          time: '0000'
        }
      }, {
        open: {
          day: 2,
          time: '0000'
        }
      }, {
        open: {
          day: 3,
          time: '0000'
        }
      }, {
        open: {
          day: 4,
          time: '0000'
        }
      }, {
        open: {
          day: 5,
          time: '0000'
        }
      }, {
        open: {
          day: 6,
          time: '0000'
        }
      }
    ]
  }]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: action.parkingId
      }

    case ActionType.CLEAR_SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: null
      }

    default:
      return state;
  }
}
