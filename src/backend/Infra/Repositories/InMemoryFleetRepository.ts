import { Fleet } from '../../Domain/Fleet';
import { FleetRepository } from '../../Domain/FleetRepository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryFleetRepository implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  async findById(id: string): Promise<Fleet | undefined> {
    return this.fleets.get(id);
  }

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.getId(), fleet);
  }

  async create(userId: string): Promise<Fleet> {
    const id = uuidv4();
    const fleet = new Fleet(id, userId);
    await this.save(fleet);
    return fleet;
  }
}
