export const SELECTED_PARKING = 'SELECTED_PARKING';
export const CLEAR_SELECTED_PARKING = 'CLEAR_SELECTED_PARKING';

export const selectParking = (parkingId) => {
  return {
    type: SELECTED_PARKING,
    parkingId
  }
}
