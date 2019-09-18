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
    openingHours
    rate
    title
  }
}`
