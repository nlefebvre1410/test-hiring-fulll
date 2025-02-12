# Backend - Vehicle Fleet Manager

A vehicle fleet management application implementing DDD and CQRS principles.

## 🚀 Installation and Setup

```bash
# Install dependencies
pnpm install

# Compile TypeScript
pnpm build

# Make the script executable
chmod +x dist/bin/fleet.js

# Create a symbolic link to make the command globally available
pnpm link
```

## 📋 Core Features

1. Vehicle fleet management
2. Vehicle registration in fleets
3. Vehicle location tracking

## 🏗️ DDD/CQRS Architecture

### Domain (`/Domain`)
Core application containing:
- Entities: Fleet, Vehicle, Location
- Value Objects: UserId, VehiclePlateNumber, Coordinates
- Repository interfaces
- Business rules

### Application (`/App`)
Use case management via CQRS:

**Commands:**
- CreateFleet
- RegisterVehicle
- LocalizeVehicle

**Queries:**
- GetFleetVehicles
- GetVehicleLocation

### Infrastructure (`/Infra`)
Technical implementation:
- Repositories (in-memory storage)
- External services

## 🔨 CLI Interface

```bash
./fleet create <userId>                                    # Create a new fleet
./fleet register-vehicle <fleetId> <vehiclePlateNumber>    # Register a vehicle
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]  # Locate a vehicle
```

## 🧪 BDD Tests

Tests are written in Cucumber and cover two main features:

### 1. Register Vehicle
- Register a vehicle in a fleet
- Handle duplicate registrations
- Manage vehicles across multiple fleets

### 2. Park Vehicle
- Vehicle location tracking
- Handle redundant locations

To run the tests:
```bash
pnpm test
```

## 📝 Definitions

- **Vehicle**: Any mode of transportation that can move from point A to point B on earth
- **Fleet**: Collection of distinct vehicles
- **Location**: Way to localize on earth (e.g., GPS coordinates)

## 🔄 Development Guidelines

1. No external frameworks (except utilities like lodash)
2. Apply CQRS and DDD principles
3. BDD tests with Cucumber
4. Clear and organized code structure
5. In-memory storage initially

## 🛠️ Code Quality

- Complete BDD test coverage
- Clean architecture
- No over-engineering
- Use of best practices and modern language features
