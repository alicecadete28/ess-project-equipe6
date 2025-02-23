import { Request, Response } from 'express';
import { addDays } from 'date-fns';
import RoomService from '../services/room.service';
import { di } from '../di';

export const buscarAcomodacoes = async (req: Request, res: Response) => {
  try {
    const { destino, data_ida, data_volta, num_pessoas } = req.query;
    // Validação: destino obrigatório
    if (!destino) {
      return res.status(400).json({ error: 'O destino é obrigatório.' });
    }

    // Validação e conversão das datas
    let checkIn: Date = data_ida
      ? new Date(data_ida as string)
      : addDays(new Date(), 1);
    let checkOut: Date = data_volta
      ? new Date(data_volta as string)
      : addDays(new Date(), 2);

    // Validação: datas inválidas
    if (isNaN(checkIn.getTime())) {
      return res.status(400).json({ message: 'Data de ida inválida.' });
    }
    if (isNaN(checkOut.getTime())) {
      return res.status(400).json({ message: 'Data de volta inválida.' });
    }

    // Validação: data de ida não pode ser maior ou igual à data de volta
    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: 'Data de ida deve ser anterior à data de volta.' });
    }

    // Conversão do número de hóspedes (se for inválido, assume o padrão 2)
    let qntHospedes = num_pessoas ? parseInt(num_pessoas as string, 10) : 2;
    if (isNaN(qntHospedes) || qntHospedes <= 0) {
      return res.status(400).json({ message: 'Número de hóspedes inválido.' });
    }

    // ✅ Passando os dois repositórios corretamente para RoomService
    const roomService = di.getService(RoomService);

    const roomsAdequados = await roomService.buscarAcomodacoes(
      destino as string,
      checkIn,
      checkOut,
      qntHospedes
    );

    if (roomsAdequados === 'no_capacity_available') {
      return res.status(404).json({
        message:
          'Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente.',
      });
    }

    if (
      roomsAdequados === 'no_rooms_found' ||
      !roomsAdequados ||
      roomsAdequados.length === 0
    ) {
      return res.status(404).json({
        message:
          'Não há acomodações disponíveis no destino e nas datas pesquisadas.',
      });
    } else {
      // Resposta de sucesso com as acomodações disponíveis
      return res.status(200).json(roomsAdequados);
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
    return res
      .status(500)
      .json({ message: 'Erro ao buscar acomodações no banco de dados.' });
  }
};
