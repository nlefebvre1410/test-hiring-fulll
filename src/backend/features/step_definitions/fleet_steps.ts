import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Fleet } from '../../Domain/Fleet';
import { InMemoryFleetRepository } from '../../Infra/Repositories/InMemoryFleetRepository';
import { RegisterVehicleHandler } from '../../App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../../App/Handlers/ParkVehicleHandler';
import { Vehicle } from '../../Domain/Vehicle';
import { GpsCoordinates } from '../../Domain/GpsCoordinates';
import { RegisterVehicleCommand } from '../../App/Commands/RegisterVehicle';
import { ParkVehicleCommand } from '../../App/Commands/ParkVehicle';

const fleetRepository = new InMemoryFleetRepository();
const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
const parkVehicleHandler = new ParkVehicleHandler(fleetRepository);

let currentFleet: Fleet;
let otherFleet: Fleet;
let currentVehicle: Vehicle;
let currentPosition: GpsCoordinates;
let error: Error | null = null;

Given('my fleet', async function () {
  currentFleet = await fleetRepository.create('test-user');
});

Given('another user\'s fleet', async function () {
  otherFleet = await fleetRepository.create('other-user');
});

Given('a vehicle', function () {
  currentVehicle = new Vehicle('ABC-123');
});

Given('a location', function () {
  currentPosition = new GpsCoordinates(48.8584, 2.2945);
});

Given('I have registered this vehicle into my fleet', async function () {
  await registerVehicleHandler.handle(new RegisterVehicleCommand(
    currentFleet.getId(),
    currentVehicle.getPlateNumber()
  ));
});

Given('this vehicle has been registered in the other user\'s fleet', async function () {
  await registerVehicleHandler.handle(new RegisterVehicleCommand(
    otherFleet.getId(),
    currentVehicle.getPlateNumber()
  ));
});

Given('my vehicle has been parked at this location', async function () {
  await parkVehicleHandler.handle(new ParkVehicleCommand(
    currentFleet.getId(),
    currentVehicle.getPlateNumber(),
    currentPosition.toJSON().latitude,
    currentPosition.toJSON().longitude
  ));
});

When('I register this vehicle into my fleet', async function () {
  try {
    await registerVehicleHandler.handle(new RegisterVehicleCommand(
      currentFleet.getId(),
      currentVehicle.getPlateNumber()
    ));
  } catch (e) {
    error = e as Error;
  }
});

When('I try to register this vehicle into my fleet', async function () {
  try {
    await registerVehicleHandler.handle(new RegisterVehicleCommand(
      currentFleet.getId(),
      currentVehicle.getPlateNumber()
    ));
  } catch (e) {
    error = e as Error;
  }
});

When('I park my vehicle at this location', async function () {
  try {
    await parkVehicleHandler.handle(new ParkVehicleCommand(
      currentFleet.getId(),
      currentVehicle.getPlateNumber(),
      currentPosition.toJSON().latitude,
      currentPosition.toJSON().longitude
    ));
  } catch (e) {
    error = e as Error;
  }
});

When('I try to park my vehicle at this location', async function () {
  try {
    await parkVehicleHandler.handle(new ParkVehicleCommand(
      currentFleet.getId(),
      currentVehicle.getPlateNumber(),
      currentPosition.toJSON().latitude,
      currentPosition.toJSON().longitude
    ));
  } catch (e) {
    error = e as Error;
  }
});

Then('this vehicle should be part of my fleet', async function () {
  const fleet = await fleetRepository.findById(currentFleet.getId());
  const vehicle = fleet?.getVehicle(currentVehicle.getPlateNumber());
  expect(vehicle).to.not.be.undefined;
});

Then('I should be informed that this vehicle is already registered in my fleet', function () {
  expect(error).to.not.be.null;
  expect(error?.message).to.equal('Vehicle is already registered in this fleet');
});

Then('the known location of my vehicle should verify this location', async function () {
  const fleet = await fleetRepository.findById(currentFleet.getId());
  const vehicle = fleet?.getVehicle(currentVehicle.getPlateNumber());
  const position = vehicle?.getPosition();
  expect(position?.equals(currentPosition)).to.be.true;
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  expect(error).to.not.be.null;
  expect(error?.message).to.equal('Vehicle is already parked at this location');
});
