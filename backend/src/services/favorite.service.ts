//import FavoriteEntity from '../entities/pf.entity'
import PfRepository from '../repositories/pf.repository';

class FavoriteService {
  // private favorites: FavoriteEntity[] = [{user_id: 'user', room_id: '297'}] as FavoriteEntity [];
  private pfRepository: PfRepository;
  constructor(
    pfRepository: PfRepository,) {
    this.pfRepository = pfRepository;
  }

  public async getFavorites(id: string): Promise<string[]> {
    const pf = await this.pfRepository.getPfById(id);
    if (!pf) {
      throw new Error('pf não cadastrado');
    }
    return pf.favorites;
  }

  public async updateFavorite(favorites: string[], id: string): Promise<string[]> {
    let pf = await this.pfRepository.getPfById(id);
    if (!pf) {
      throw new Error('pf não cadastrado');
    }
    pf.favorites = favorites;
    pf = await this.pfRepository.updatePf(pf.id, pf);
    return pf?.favorites!;
  }
}

export default FavoriteService;