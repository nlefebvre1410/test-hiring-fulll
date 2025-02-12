import * as fs from 'fs';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

import { Fleet } from '../../Domain/Fleet';
import { FleetRepository } from '../../Domain/FleetRepository';
import { GpsCoordinates } from '../../Domain/GpsCoordinates';
import { Vehicle } from '../../Domain/Vehicle';

type SerializedVehicle = {
  readonly plateNumber: string;
  readonly currentPosition?: {
    readonly latitude: number;
    readonly longitude: number;
    readonly altitude?: number;
  };
};

type SerializedFleet = {
  readonly id: string;
  readonly userId: string;
  readonly vehicles: readonly SerializedVehicle[];
};

type SerializedData = Record<string, SerializedFleet>;

export class FileFleetRepository implements FleetRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'data', 'fleets.json');
    this.initializeStorage();
  }

  private initializeStorage(): void {
    const dataDir = path.dirname(this.filePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      const initialData: SerializedData = {};
      fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
    }
  }

  private async loadData(): Promise<SerializedData> {
    const content = await fs.promises.readFile(this.filePath, 'utf-8');
    return JSON.parse(content) as SerializedData;
  }

  private async saveData(data: SerializedData): Promise<void> {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(data, null, 2)
    );
  }

  // private async getPersistentVehicles(fleetId: string): Promise<Set<string>> {
  //   try {
  //     const data = await this.loadData();
  //     return new Set(data[fleetId]?.vehicles?.map(v => v.plateNumber) || []);
  //   } catch {
  //     return new Set();
  //   }
  // }

  private serializeFleet(fleet: Fleet, existingFleetData?: SerializedFleet): SerializedFleet {
    const existingVehicles = new Set(existingFleetData?.vehicles.map(v => v.plateNumber) || []);

    const vehiclesMap = new Map<string, SerializedVehicle>();

    existingFleetData?.vehicles.forEach(v => {
      vehiclesMap.set(v.plateNumber, v);
    });

    existingVehicles.forEach(plateNumber => {
      const vehicle = fleet.getVehicle(plateNumber);
      if (vehicle) {
        const position = vehicle.getPosition();
        vehiclesMap.set(plateNumber, {
          plateNumber,
          currentPosition: position ? {
            latitude: position.toJSON().latitude,
            longitude: position.toJSON().longitude,
            altitude: position.toJSON().altitude
          } : undefined
        });
      }
    });

    const currentVehicles = this.extractFleetVehicles(fleet);
    currentVehicles.forEach(vehicle => {
      const position = vehicle.getPosition();
      vehiclesMap.set(vehicle.getPlateNumber(), {
        plateNumber: vehicle.getPlateNumber(),
        currentPosition: position ? {
          latitude: position.toJSON().latitude,
          longitude: position.toJSON().longitude,
          altitude: position.toJSON().altitude
        } : undefined
      });
    });

    return {
      id: fleet.getId(),
      userId: fleet.getUserId(),
      vehicles: Array.from(vehiclesMap.values())
    };
  }

  private extractFleetVehicles(fleet: Fleet): Vehicle[] {
    return Array.from(fleet.getVehicles().values());
  }

  private deserializeFleet(serialized: SerializedFleet): Fleet {
    const fleet = new Fleet(serialized.id, serialized.userId);

    for (const vehicleData of serialized.vehicles) {
      try {
        const vehicle = new Vehicle(vehicleData.plateNumber);
        if (vehicleData.currentPosition) {
          const position = new GpsCoordinates(
            vehicleData.currentPosition.latitude,
            vehicleData.currentPosition.longitude,
            vehicleData.currentPosition.altitude
          );
          vehicle.park(position);
        }
        fleet.registerVehicle(vehicle);
      } catch (error) {
        console.error(`Failed to deserialize vehicle ${vehicleData.plateNumber}:`, error);
      }
    }

    return fleet;
  }

  async findById(id: string): Promise<Fleet | undefined> {
    const data = await this.loadData();
    const fleetData = data[id];
    if (!fleetData) {
      return undefined;
    }
    return this.deserializeFleet(fleetData);
  }

  async save(fleet: Fleet): Promise<void> {
    const data = await this.loadData();
    const existingFleetData = data[fleet.getId()];
    data[fleet.getId()] = this.serializeFleet(fleet, existingFleetData);
    await this.saveData(data);
  }

  async create(userId: string): Promise<Fleet> {
    const id = uuidv4();
    const fleet = new Fleet(id, userId);
    await this.save(fleet);
    return fleet;
  }
}
