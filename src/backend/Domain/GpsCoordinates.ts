export class GpsCoordinates {
  constructor(
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly altitude?: number
  ) {
    this.validateCoordinates();
  }

  private validateCoordinates(): void {
    if (this.latitude < -90 || this.latitude > 90) {
      throw new Error('Invalid latitude value');
    }
    if (this.longitude < -180 || this.longitude > 180) {
      throw new Error('Invalid longitude value');
    }
  }

  equals(other: GpsCoordinates): boolean {
    return this.latitude === other.latitude &&
      this.longitude === other.longitude &&
      this.altitude === other.altitude;
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      altitude: this.altitude
    };
  }
}
