export const SELECTED_PARKING = 'SELECTED_PARKING';
export const CLEAR_SELECTED_PARKING = 'CLEAR_SELECTED_PARKING';

export const START_PARKING_PENDING = 'START_PARKING_PENDING';
export const START_PARKING_SUCCESS = 'START_PARKING_SUCCESS';
export const START_PARKING_FAILURE = 'START_PARKING_FAILURE';

export const selectParking = (parkingId) => {
  return {
    type: SELECTED_PARKING,
    parkingId
  }
}

export const startParking = ({ vehicleId, plateNumber, slotNumber }) => {
  return (dispatch, getState) => {
    dispatch({
       type: START_PARKING_PENDING 
    });

    setTimeout(() => {
      const { user, map: { selectedParkingId } } = getState();

      dispatch({
        type: START_PARKING_SUCCESS,
        invoice: {
          vehicleId,
          plateNumber,
          slotNumber,
          userID: user.id,
          parkingId: selectedParkingId
        }
      });
      }, 3000);
  }
}
