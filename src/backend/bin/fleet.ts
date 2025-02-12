#!/usr/bin/env node
import { Command } from 'commander';

import { FileFleetRepository } from '../Infra/Repositories/FileFleetRepository';
import { ParkVehicleCommand } from '../App/Commands/ParkVehicle';
import { RegisterVehicleCommand } from '../App/Commands/RegisterVehicle';
import { ParkVehicleHandler } from '../App/Handlers/ParkVehicleHandler';
import { RegisterVehicleHandler } from '../App/Handlers/RegisterVehicleHandler';

const program = new Command();
const fleetRepository = new FileFleetRepository();
const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
const parkVehicleHandler = new ParkVehicleHandler(fleetRepository);

program
  .name('fleet')
  .description('CLI to manage vehicle fleets');

program
  .command('create')
  .description('Create a new fleet')
  .argument('<userId>', 'User ID')
  .action(async (userId: string) => {
    try {
      const fleet = await fleetRepository.create(userId);
      console.log(fleet.getId());
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program
  .command('register-vehicle')
  .description('Register a vehicle into a fleet')
  .argument('<fleetId>', 'Fleet ID')
  .argument('<plateNumber>', 'Vehicle plate number')
  .action(async (fleetId: string, plateNumber: string) => {
    try {
      await registerVehicleHandler.handle(new RegisterVehicleCommand(
        fleetId,
        plateNumber
      ));
      console.log('Vehicle successfully registered');
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program
  .command('localize-vehicle')
  .description('Set vehicle location')
  .argument('<fleetId>', 'Fleet ID')
  .argument('<plateNumber>', 'Vehicle plate number')
  .argument('<lat>', 'Latitude')
  .argument('<lng>', 'Longitude')
  .argument('[alt]', 'Altitude (optional)')
  .action(async (fleetId: string, plateNumber: string, lat: string, lng: string, alt?: string) => {
    try {
      await parkVehicleHandler.handle(new ParkVehicleCommand(
        fleetId,
        plateNumber,
        parseFloat(lat),
        parseFloat(lng),
        alt ? parseFloat(alt) : undefined
      ));
      console.log('Vehicle location successfully updated');
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse();
