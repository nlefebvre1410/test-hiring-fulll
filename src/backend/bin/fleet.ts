#!/usr/bin/env node
import { Command } from 'commander';
import { InMemoryFleetRepository } from '../Infra/Repositories/InMemoryFleetRepository';
import { RegisterVehicleHandler } from '../App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../App/Handlers/ParkVehicleHandler';
import { RegisterVehicleCommand } from '../App/Commands/RegisterVehicle';
import { ParkVehicleCommand } from '../App/Commands/ParkVehicle';

const program = new Command();
const fleetRepository = new InMemoryFleetRepository();
const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
const parkVehicleHandler = new ParkVehicleHandler(fleetRepository);

program
  .name('fleet')
  .description('CLI pour gérer une flotte de véhicules');

program
  .command('create')
  .description('Créer une nouvelle flotte')
  .argument('<userId>', 'ID de l\'utilisateur')
  .action(async (userId: string) => {
    try {
      const fleet = await fleetRepository.create(userId);
      console.log(fleet.getId());
    } catch (error) {
      console.error('Erreur:', error);
      process.exit(1);
    }
  });

program
  .command('register-vehicle')
  .description('Enregistrer un véhicule dans une flotte')
  .argument('<fleetId>', 'ID de la flotte')
  .argument('<plateNumber>', 'Numéro d\'immatriculation')
  .action(async (fleetId: string, plateNumber: string) => {
    try {
      await registerVehicleHandler.handle(new RegisterVehicleCommand(
        fleetId,
        plateNumber
      ));
      console.log('Véhicule enregistré avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      process.exit(1);
    }
  });

program
  .command('localize-vehicle')
  .description('Définir la position d\'un véhicule')
  .argument('<fleetId>', 'ID de la flotte')
  .argument('<plateNumber>', 'Numéro d\'immatriculation')
  .argument('<lat>', 'Latitude')
  .argument('<lng>', 'Longitude')
  .argument('[alt]', 'Altitude (optionnelle)')
  .action(async (fleetId: string, plateNumber: string, lat: string, lng: string, alt?: string) => {
    try {
      await parkVehicleHandler.handle(new ParkVehicleCommand(
        fleetId,
        plateNumber,
        parseFloat(lat),
        parseFloat(lng),
        alt ? parseFloat(alt) : undefined
      ));
      console.log('Position du véhicule mise à jour avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      process.exit(1);
    }
  });

program.parse();
