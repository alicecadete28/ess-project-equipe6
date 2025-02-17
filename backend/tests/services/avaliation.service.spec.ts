import ReservationEntity from '../../src/entities/reservation.entity';
import ReservationRepository from '../../src/repositories/reservation.repository';
import AvaliationService from '../../src/services/avaliation.service';

describe('AvaliationService', () => {
  let mockReservationRepository: jest.Mocked<Partial<ReservationRepository>>;
  let service: AvaliationService;
  let mockReservationEntity: ReservationEntity;

  beforeEach(() => {
    mockReservationRepository = {
      getReservations: jest.fn(),
      getReservation: jest.fn(),
      createReservation: jest.fn(),
      updateReservation: jest.fn(),
      deleteReservation: jest.fn(),
    };

    service = new AvaliationService(mockReservationRepository as ReservationRepository);

    mockReservationEntity = new ReservationEntity({
      id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a',
      pf_id: '1',
      room_id: '1',
      check_in: new Date('2025-03-09'),
      check_out: new Date('2025-03-10'),
      guests: 0,
      total: 0,
      status: 'o',
      rating: {
        stars: 0,
        comment: 'o'
      }
    });

    // Mock the repository methods
    jest.spyOn(mockReservationRepository, 'getReservations').mockResolvedValue([mockReservationEntity]);
    jest.spyOn(mockReservationRepository, 'updateReservation').mockResolvedValue(mockReservationEntity);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should register an accommodation review successfully', async () => {
    const result = await service.avaliarAcomodacao(mockReservationEntity.id, 5, 'Ótima acomodação!');

    expect(mockReservationRepository.getReservations).toBeCalledTimes(1);
    expect(mockReservationRepository.updateReservation).toBeCalledWith(mockReservationEntity.id, expect.objectContaining({
      rating: {
        stars: 5,
        comment: 'Ótima acomodação!'
      }
    }));
    expect(result).toEqual(mockReservationEntity);
  });

  it('should throw an error when reservation is not found', async () => {
    jest.spyOn(mockReservationRepository, 'getReservations').mockResolvedValue([]);

    await expect(service.avaliarAcomodacao('invalid-id', 5, 'Ótima acomodação!')).rejects.toThrow('Reserva não encontrada.');
    expect(mockReservationRepository.getReservations).toBeCalledTimes(1);
  });

  it('should throw an error when the rating is not between 1 and 5', async () => {
    await expect(service.avaliarAcomodacao(mockReservationEntity.id, 6, 'Nota inválida')).rejects.toThrow('A nota deve ser um número entre 1 e 5.');
    expect(mockReservationRepository.getReservations).toBeCalledTimes(0);
  });

  it('should limit the comment length to 500 characters', async () => {
    const longComment = 'a'.repeat(600);
    await expect(service.avaliarAcomodacao(mockReservationEntity.id, 4, longComment)).rejects.toThrow('O comentário não pode ter mais de 500 caracteres.');
    expect(mockReservationRepository.getReservations).toBeCalledTimes(0);
  });
});