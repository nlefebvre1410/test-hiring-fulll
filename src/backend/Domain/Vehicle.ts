import { GpsCoordinates } from './GpsCoordinates';

export class Vehicle {
  private currentPosition?: GpsCoordinates;

  constructor(
    private readonly plateNumber: string
  ) {
    if (!plateNumber || plateNumber.trim().length === 0) {
      throw new Error('Vehicle plate number cannot be empty');
    }
  }

  park(coordinates: GpsCoordinates): void {
    if (this.currentPosition?.equals(coordinates)) {
      throw new Error('Vehicle is already parked at this location');
    }
    this.currentPosition = coordinates;
  }

  getPosition(): GpsCoordinates | undefined {
    return this.currentPosition;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }
}
