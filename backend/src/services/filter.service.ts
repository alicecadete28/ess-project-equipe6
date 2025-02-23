class FilterService {
  filtrarAcomodacoes(roomsAdequados: any[], filtros: { [key: string]: any }) {
    if (!roomsAdequados || !Array.isArray(roomsAdequados)) {
      throw new Error(
        'Lista de quartos adequada não foi fornecida corretamente.'
      );
    }

    // Converte os valores dos filtros para booleanos
    const filtrosBooleanos = {
      ar_condicionado: filtros.ar_condicionado === 'true',
      tv: filtros.tv === 'true',
      wifi: filtros.wifi === 'true',
      petFriendly: filtros.petFriendly === 'true',
      cafeDaManha: filtros.cafeDaManha === 'true',
      estacionamento: filtros.estacionamento === 'true',
    };

    let quartosFiltrados = roomsAdequados.filter((room) => {
      return (
        (!filtrosBooleanos.ar_condicionado || room.ar_condicionado === true) &&
        (!filtrosBooleanos.tv || room.tv === true) &&
        (!filtrosBooleanos.wifi || room.wifi === true) &&
        (!filtrosBooleanos.petFriendly || room.petFriendly === true) &&
        (!filtrosBooleanos.cafeDaManha || room.cafeDaManha === true) &&
        (!filtrosBooleanos.estacionamento || room.estacionamento === true)
      );
    });

    if (quartosFiltrados.length === 0) {
      console.warn('Nenhuma acomodação atende aos filtros selecionados.');
    }

    // Ordena os quartos filtrados do menor preço para o maior
    quartosFiltrados.sort((a, b) => a.price - b.price);

    return quartosFiltrados;
  }
}
export default FilterService;
