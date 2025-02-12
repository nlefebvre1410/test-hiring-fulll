import { Vehicle } from './Vehicle';
import { GpsCoordinates } from './GpsCoordinates';

export class Fleet {
  private vehicles: Map<string, Vehicle> = new Map();

  constructor(
    private readonly id: string,
    private readonly userId: string
  ) {}

  registerVehicle(vehicle: Vehicle): void {
    const plateNumber = vehicle.getPlateNumber();
    if (this.vehicles.has(plateNumber)) {
      throw new Error('Vehicle is already registered in this fleet');
    }
    this.vehicles.set(plateNumber, vehicle);
  }

  parkVehicle(plateNumber: string, coordinates: GpsCoordinates): void {
    const vehicle = this.vehicles.get(plateNumber);
    if (!vehicle) {
      throw new Error('Vehicle not found in fleet');
    }
    vehicle.park(coordinates);
  }

  getVehicle(plateNumber: string): Vehicle | undefined {
    return this.vehicles.get(plateNumber);
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }
}
