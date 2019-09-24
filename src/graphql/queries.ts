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

export const me = `query Me {
  me {
    userID
    fullName
    email
    phone
    vehicles {
      make
      model
      plateNumber
    }
    invoices {
      parkingID
      invoiceID
      slotNumber
      dateFrom
      dateTo
      plateNumber
      price
    }
  }
}
`;
