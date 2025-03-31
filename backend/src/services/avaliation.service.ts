import ReservationRepository from '../repositories/reservation.repository';

class AvaliationService {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async avaliarAcomodacao(
    id: string,
    num_Estrelas: number,
    comentario: string
  ) {
    // Validate the rating
    if (num_Estrelas < 1 || num_Estrelas > 5) {
      throw new Error('A nota deve ser um número entre 1 e 5.');
    }

    // Validate the comment length
    if (comentario.length > 500) {
      throw new Error('O comentário não pode ter mais de 500 caracteres.');
    }

    try {
      const reservas = await this.reservationRepository.getReservations();

      const reserva = reservas.find((res) => res.id === id);

      if (!reserva) {
        throw new Error('Reserva não encontrada.');
      }
      reserva.rating = { stars: num_Estrelas, comment: comentario };

      const updatedReservation =
        await this.reservationRepository.updateReservation(id, reserva);

      return updatedReservation;
    } catch (error) {
      console.error('Error in AvaliationService.avaliarAcomodacao:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }
}

export default AvaliationService;
