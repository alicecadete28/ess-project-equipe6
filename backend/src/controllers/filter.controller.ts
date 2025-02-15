import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/findReservation.repository';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';
import FilterService from '../services/filter.service';

export const filtrarAcomodacoes = async (req: Request, res: Response) => {
    try {
        const { destino, data_ida, data_volta, num_pessoas, ...filtros } = req.query;

        const checkInDate = parseISO(data_ida as string) || addDays(new Date(), 1);
        const checkOutDate = parseISO(data_volta as string) || addDays(new Date(), 2);
        const numHospedes = Number(num_pessoas) || 2;

        
        const roomService = new RoomService(new RoomRepository());
        const roomsAdequados = await roomService.buscarAcomodacoes(destino as string, checkInDate, checkOutDate, numHospedes);

        const quartosFiltrados = FilterService.filtrarAcomodacoes(roomsAdequados, filtros);

if (quartosFiltrados.length === 0) {
    return res.status(200).json({ message: 'Nenhuma acomodação atende aos filtros selecionados.' });
}

console.table(quartosFiltrados);
return res.status(200).json(quartosFiltrados);

        
    } catch (error: unknown) { 
        if (error instanceof Error) { 
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Erro desconhecido' });
        }
    }
};
