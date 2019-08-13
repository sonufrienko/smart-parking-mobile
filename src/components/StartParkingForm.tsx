import React, { useState } from 'react';
import { Text, View, Button, TextInput, Picker } from 'react-native';
import styles from './ParkingDetailsStyles';

type Vehicle = {
  id: number,
  make: string,
  model: string
  plateNumber: string
}

type SetVehicleParams = {
  id: number, 
  plateNumber: string
}

type VehicleSelectorProps = {
  vehicles: Vehicle[],
  setVehicle(params: SetVehicleParams): void,
  selectedVehicle: SetVehicleParams,
  vehicleSelectTitle: string
}

function VehicleSelector({ vehicles, setVehicle, selectedVehicle, vehicleSelectTitle }: VehicleSelectorProps) {
  return (
    <View style={{ marginBottom: 20 }}>
        <Text style={styles.grayColor}>{vehicleSelectTitle}</Text>
        <View style={styles.formVehicleSelect}>
          <Picker
            selectedValue={selectedVehicle.id}
            onValueChange={itemValue => {
              const vehicle = vehicles.find(item => item.id === itemValue);
              setVehicle({
                id: itemValue,
                plateNumber: vehicle.plateNumber
              });
            }}>
            {
              vehicles.map(vehicle => 
                <Picker.Item
                  key={vehicle.id}
                  label={`${vehicle.make} ${vehicle.model}, ${vehicle.plateNumber}`}
                  value={vehicle.id} 
                />
              )
            }
          </Picker>
        </View>
      </View>
  )
}

const slotNumberRule = RegExp('^[A-Za-z0-9]{2,6}$');
const isSlotNumberValid = (slotNumber: string):boolean => slotNumber && slotNumberRule.test(slotNumber);

export default function StartParkingForm({ vehicles, onSubmit, isLoading, buttonTitle, slotNumberTitle, vehicleSelectTitle }) {
  const [selectedVehicle, setVehicle] = useState({ id: 0, plateNumber: '' });
  const [slotNumber, setSlotNumber] = useState('');
  const slotNumberIsValid = isSlotNumberValid(slotNumber);

  return (
    <View>
      <VehicleSelector vehicles={vehicles} setVehicle={setVehicle} selectedVehicle={selectedVehicle} vehicleSelectTitle={vehicleSelectTitle} />

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.grayColor}>{slotNumberTitle}</Text>
        <TextInput
          style={styles.formSlotNumber}
          onChangeText={setSlotNumber}
          value={slotNumber}
        />
      </View>

      <Button
        title={buttonTitle}
        disabled={!slotNumberIsValid || isLoading}
        onPress={() => {
          onSubmit({
            slotNumber,
            vehicleId: selectedVehicle.id, 
            plateNumber: selectedVehicle.plateNumber });
        }}
      />
    </View>
  )
}
