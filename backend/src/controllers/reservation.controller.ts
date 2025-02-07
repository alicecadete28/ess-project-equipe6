import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';
import { addDays, parseISO } from 'date-fns';

export const buscarAcomodacoes = async (req: Request, res: Response) => {
  const { destino, data_ida, data_volta, num_pessoas} = req.query;

  if (!destino) {
    res.status(400).json({ error: 'O destino é obrigatório.' });
  }

let checkIn: Date;
if (data_ida) {
  checkIn = new Date(data_ida as string);
} else {
  checkIn = addDays(new Date(), 1);
}

let checkOut: Date;
if (data_volta) {
  checkOut = new Date(data_volta as string);
} else {
  checkOut = addDays(new Date(), 2);
}

let qntHospedes: number;
if(num_pessoas){
  qntHospedes = parseInt(num_pessoas as string);
}
else{
  qntHospedes = 2;
}

 // Agora verificamos corretamente se `checkIn` e `checkOut` foram atribuídos corretamente
if (!checkIn || isNaN(checkIn.getTime())) {
  return res.status(400).json({ message: 'Data de ida inválida' });
}
if (!checkOut || isNaN(checkOut.getTime())) {
  return res.status(400).json({ message: 'Data de volta inválida' });
}
  if(checkIn >= checkOut){
    res.status(400).json({ message: 'Data de ida maior que data de volta' });
  }

 console.log(Database.getInstance());
  const roomRepository = new RoomRepository();
  const rooms = await roomRepository.getRooms(); // busca todas as acomodacoes disponiveis

  const reservationRepository = new ReservationRepository();
  const reservations = await reservationRepository.getReservations(); // busca todas as reservas

  const roomsAvailable = rooms.filter((room) => {
    const quartoComReservas = reservations.some(reservation => reservation.room_id === room.id); // verifica se o id da reserva é o mesmo do quarto
    if(!quartoComReservas){ // quarto com 0 reservas ja entra direto na lista
      return true;
    }
    return !reservations.some(reservation =>
      reservation.room_id === room.id &&
      new Date(reservation.check_in) <= new Date(checkOut) &&
      new Date(reservation.check_out) >= new Date(checkIn)
    ); // retornou quartos com a data livre
  });

  const roomsAvailableDestino = roomsAvailable.filter(room => room.local === destino);

  if (roomsAvailableDestino.length === 0) {
    return res.status(404).json({ message: 'Não há acomodações disponíveis no destino e nas datas pesquisadas.' });
  }

  // Quartos adequados para a quantidade de hospedes e destino
  const roomsAdequados = roomsAvailable.filter(room => room.local === destino && room.capacity >= qntHospedes);

  if (roomsAdequados.length === 0) {
    return res.status(400).json({ message: 'Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente.' });
  }

  console.log('Destino:', destino);
  console.log('Data de ida:', checkIn);
  console.log('Data de volta:', checkOut);
  console.log('Numero de Pessoas:', qntHospedes);
  res.json(roomsAdequados);

};


