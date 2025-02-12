import { Fleet } from './Fleet';

export interface FleetRepository {
  findById(id: string): Promise<Fleet | undefined>;
  save(fleet: Fleet): Promise<void>;
  create(userId: string): Promise<Fleet>;
}
