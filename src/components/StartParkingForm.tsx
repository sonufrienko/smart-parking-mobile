import React, { useState } from 'react';
import { Text, View, Button, TextInput, Picker } from 'react-native';
import styles from './styles';
import { CreateInvoiceMutationVariables, Vehicle } from '../types';

type VehicleSelectorProps = {
  vehicles: Vehicle[],
  setVehicle(selectedPlateNumber: string | null): void,
  selectedPlateNumber: string | null,
  vehicleSelectTitle: string
}

function VehicleSelector({ vehicles, setVehicle, selectedPlateNumber, vehicleSelectTitle }: VehicleSelectorProps) {
  return (
    <View style={{ marginBottom: 20 }}>
        <Text style={styles.grayColor}>{vehicleSelectTitle}</Text>
        <View style={styles.formVehicleSelect}>
          <Picker
            selectedValue={selectedPlateNumber}
            onValueChange={itemValue => {
              const vehicle = vehicles.find(item => item.plateNumber === itemValue);
              setVehicle(vehicle.plateNumber);
            }}>
            {
              vehicles.map(vehicle => 
                <Picker.Item
                  key={vehicle.plateNumber}
                  label={`${vehicle.make} ${vehicle.model}, ${vehicle.plateNumber}`}
                  value={vehicle.plateNumber} 
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

type StartParkingFormProps = {
  vehicles: Array<Vehicle>,
  onSubmit(data: CreateInvoiceMutationVariables): void,
  isLoading: boolean,
  buttonTitle: string,
  slotNumberTitle: string, 
  vehicleSelectTitle: string,
  selectedParkingId: string
}

export default function StartParkingForm({ vehicles, onSubmit, isLoading, buttonTitle, slotNumberTitle, vehicleSelectTitle, selectedParkingId }: StartParkingFormProps) {
  const [ firstVehicle ] = vehicles;
  const [selectedPlateNumber, setVehicle] = useState(firstVehicle.plateNumber);
  const [slotNumber, setSlotNumber] = useState('');
  const slotNumberIsValid = isSlotNumberValid(slotNumber);
  const createInvoiceData: CreateInvoiceMutationVariables = {
    input: {
      parkingID: selectedParkingId,
      slotNumber: slotNumber.toLowerCase(),
      plateNumber: selectedPlateNumber
    }
  };

  return (
    <View>
      <VehicleSelector vehicles={vehicles} setVehicle={setVehicle} selectedPlateNumber={selectedPlateNumber} vehicleSelectTitle={vehicleSelectTitle} />

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
          onSubmit(createInvoiceData);
        }}
      />
    </View>
  )
}
