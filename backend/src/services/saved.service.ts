import PfRepository from '../repositories/pf.repository';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

class SavedService {
  private pfRepository: PfRepository;
  
  constructor(pfRepository: PfRepository) {
    this.pfRepository = pfRepository;
  }

  public async getSaved(id: string): Promise<string[]> {
    const pf = await this.pfRepository.getPfById(id);
    //console.log('pf', pf);
    if (!pf) {
      throw new HttpNotFoundError({
        msg: 'Pf não cadastrado',
        msgCode: 'Pf_not_found',
      });
    }
    return pf.savedRooms;
  }

  public async updateSaved(savedRooms: string[], id: string): Promise<string[]> {
    let pf = await this.pfRepository.getPfById(id);
    //console.log('pf', pf);
    if (!pf) {
      throw new HttpNotFoundError({
        msg: 'Pf não cadastrado',
        msgCode: 'Pf_not_found',
      });
    }
    pf.savedRooms = savedRooms;
    pf = await this.pfRepository.updatePf(pf.id, pf);
    return pf?.savedRooms!;
  }
  
}

export default SavedService;
