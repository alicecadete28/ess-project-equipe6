import FindReservationsEntity from '../entities/reservation.entity';
import BaseRepository from './base.repository';

class FindReservationRepository extends BaseRepository<FindReservationsEntity> {
  constructor() {
    super('Reservation');
  }

  public async getReservations(): Promise<FindReservationsEntity[]> {
    return await this.findAll();
  }

  public async getReservation(id: string): Promise<FindReservationsEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createReservation(data: FindReservationsEntity): Promise<FindReservationsEntity> {
    return await this.add(data);
  }

  public async updateReservation(
    id: string,
    data: FindReservationsEntity
  ): Promise<FindReservationsEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteReservation(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default FindReservationRepository;

