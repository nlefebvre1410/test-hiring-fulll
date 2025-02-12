import { GpsCoordinates } from '../../Domain/GpsCoordinates';
import { FleetRepository } from '../../Domain/FleetRepository';
import { ParkVehicleCommand } from '../Commands/ParkVehicle';

export class ParkVehicleHandler {
  constructor(private fleetRepository: FleetRepository) {}

  async handle(command: ParkVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);
    if (!fleet) {
      throw new Error('Flotte non trouvée');
    }

    const coordinates = new GpsCoordinates(
      command.latitude,
      command.longitude,
      command.altitude
    );

    fleet.parkVehicle(command.plateNumber, coordinates);

    await this.fleetRepository.save(fleet);
  }
}
