import supertest from 'supertest';
import ReservationEntity from '../../src/entities/reservation.entity';
import app from '../../src/app';
import { di } from '../../src/di';
import ReservationRepository from '../../src/repositories/reservation.repository';

describe('ReservationController', () => {
  let request = supertest(app);
  let mockReservationRepository: ReservationRepository;

  let mockReservationEntity: ReservationEntity = new ReservationEntity({
    id: '123',
    pf_id: 'user123',
    room_id: 'room456',
    check_in: new Date('2025-03-01'),
    check_out: new Date('2025-03-05'),
    guests: 2,
    total: 500,
    status: 'pending',
    rating: 0,
    confirmed: false,
  });

  beforeEach(() => {
    mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);
  });

  it('should return a reservation by id', async () => {
    const createdReservation = await mockReservationRepository.add(mockReservationEntity);
    const response = await request.get(`/api/reservations/${createdReservation.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(createdReservation);
  });

  it('should throw an error when reservation is not found', async () => {
    const response = await request.get(`/api/reservations/invalid_id`);

    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('reservation_not_found');
  });

  it('should create a reservation', async () => {
    const response = await request.post('/api/reservations').send(mockReservationEntity);

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(expect.objectContaining({ pf_id: mockReservationEntity.pf_id }));
  });

  it('should update reservation dates', async () => {
    const createdReservation = await mockReservationRepository.add(mockReservationEntity);

    const response = await request.patch(`/api/reservations/${createdReservation.id}/dates`).send({
      check_in: new Date('2025-04-01'),
      check_out: new Date('2025-04-10'),
    });

    expect(response.status).toBe(200);
    expect(response.body.data.check_in).toBe('2025-04-01T00:00:00.000Z');
  });

  it('should update reservation guests', async () => {
    const createdReservation = await mockReservationRepository.add(mockReservationEntity);

    const response = await request.patch(`/api/reservations/${createdReservation.id}/guests`).send({ guests: 4 });

    expect(response.status).toBe(200);
    expect(response.body.data.guests).toBe(4);
  });

  it('should confirm a reservation', async () => {
    const createdReservation = await mockReservationRepository.add(mockReservationEntity);

    const response = await request.patch(`/api/reservations/${createdReservation.id}/confirm`);

    expect(response.status).toBe(200);
    expect(response.body.data.confirmed).toBe(true);
  });

  it('should delete a reservation', async () => {
    const createdReservation = await mockReservationRepository.add(mockReservationEntity);

    const response = await request.delete(`/api/reservations/${createdReservation.id}`);

    const deletedReservation = await mockReservationRepository.findOne(
      (reservation) => reservation.id === createdReservation.id
    );

    expect(response.status).toBe(200);
    expect(deletedReservation).toBeNull();
  });
});
