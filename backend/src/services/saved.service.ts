import PfRepository from '../repositories/pf.repository';

class SavedService {
  private pfRepository: PfRepository;
  
  constructor(pfRepository: PfRepository) {
    this.pfRepository = pfRepository;
  }

  public async getSaved(id: string): Promise<string[]> {
    const pf = await this.pfRepository.getPfById(id);
    if (!pf) {
      throw new Error('pf não cadastrado');
    }
    return pf.savedRooms;
  }

  public async updateSaved(savedRooms: string[], id: string): Promise<string[]> {
    let pf = await this.pfRepository.getPfById(id);
    if (!pf) {
      throw new Error('pf não cadastrado');
    }
    pf.savedRooms = savedRooms;
    pf = await this.pfRepository.updatePf(pf.id, pf);
    return pf?.savedRooms!;
  }
}

export default SavedService;
