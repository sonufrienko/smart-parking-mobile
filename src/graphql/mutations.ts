export const startParking = `mutation StartParking($input: StartParkingInput!) {
  startParking(input: $input) {
    Id
    UserID
    SlotID
    PlateNumber
    DateFrom
    DateTo
    Price
  }
}
`;
export const finishParking = `mutation FinishParking($input: FinishParkingInput!) {
  finishParking(input: $input) {
    Id
    UserID
    SlotID
    PlateNumber
    DateFrom
    DateTo
    Price
  }
}
`;