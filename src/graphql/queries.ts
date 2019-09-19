export const parkingListWithoutSlots = `query Parking {
  parking {
    parkingID
    address {
      city
      countryCode
      line1
      postalCode
      state
    }
    features
    location {
      latitude
      longitude
    }
    openingHours {
      open {
        day
        time
      }
      close {
        day
        time
      }
    }
    freeSlots
    rate
    title
  }
}`
