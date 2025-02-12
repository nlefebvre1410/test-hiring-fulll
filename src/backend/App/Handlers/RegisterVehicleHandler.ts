import { Vehicle } from '../../Domain/Vehicle';
import { FleetRepository } from '../../Domain/FleetRepository';
import { RegisterVehicleCommand } from '../Commands/RegisterVehicle';

export class RegisterVehicleHandler {
  constructor(private fleetRepository: FleetRepository) {}

  async handle(command: RegisterVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);
    if (!fleet) {
      throw new Error('Flotte non trouvée');
    }

    const vehicle = new Vehicle(command.plateNumber);
    fleet.registerVehicle(vehicle);

    await this.fleetRepository.save(fleet);
  }
}
