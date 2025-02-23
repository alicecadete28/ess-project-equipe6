import { Request, Response } from 'express';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';
import FilterService from '../services/filter.service';
import { di } from '../di';

export const filtrarAcomodacoes = async (req: Request, res: Response) => {
  try {
    const { destino, data_ida, data_volta, num_pessoas, ...filtros } =
      req.query;

    if (!destino) {
      return res
        .status(400)
        .json({ message: 'Parâmetros obrigatórios ausentes.' });
    }

    const checkInDate = data_ida
      ? parseISO(data_ida as string)
      : addDays(new Date(), 1);
    const checkOutDate = data_volta
      ? parseISO(data_volta as string)
      : addDays(new Date(), 2);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: 'Datas inválidas fornecidas.' });
    }

    const numHospedes = Number(num_pessoas) || 2;

    const roomService = di.getService(RoomService);

    let roomsAdequados;

    try {
      roomsAdequados = await roomService.buscarAcomodacoes(
        destino as string,
        checkInDate,
        checkOutDate,
        numHospedes
      );
    } catch (error) {
      console.error('Erro ao buscar acomodações:', error);
      return res
        .status(500)
        .json({ message: 'Erro ao buscar acomodações no banco de dados.' });
    }

    if (
      !roomsAdequados ||
      (Array.isArray(roomsAdequados) && roomsAdequados.length === 0)
    ) {
      return res.status(200).json({
        message: 'Nenhuma acomodação atende aos filtros selecionados.',
      });
    }

    if (!Array.isArray(roomsAdequados)) {
      return res
        .status(500)
        .json({ message: 'Erro ao processar acomodações.' });
    }

    const filterService = di.getService(FilterService);

    const quartosFiltrados = filterService.filtrarAcomodacoes(
      roomsAdequados,
      filtros
    );

    if (quartosFiltrados.length === 0) {
      return res.status(404).json({
        message: 'Nenhuma acomodação atende aos filtros selecionados.',
      });
    }

    return res.status(200).json(quartosFiltrados);
  } catch (error: any) {
    console.error('Erro no servidor:', error.message);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
