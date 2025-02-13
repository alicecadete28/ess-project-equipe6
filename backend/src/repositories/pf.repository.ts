import BaseRepository from './base.repository';
import PfEntity from '../entities/pf.entity';

class PfRepository extends BaseRepository<PfEntity> {
  constructor() {
    super('pfs');
  }

  public async getPfs(): Promise<PfEntity[]> {
    return await this.findAll();
  }

  public async getPfById(id: string): Promise<PfEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async getPfByCpf(cpf: string): Promise<PfEntity | null> {
    return await this.findOne((item) => item.cpf === cpf);
  }

  public async createPf(data: PfEntity): Promise<PfEntity> {
    return await this.add(data);
  }

  // public async updatePfFavorite(id:string,data:Array<string>):Promise<void>{
  //    const pf = await this.getPfById(id);
  //    pf.favorite = data;
  //    await this.updatePf(id,pf);
  // }

  public async updatePf(id: string, data: PfEntity): Promise<PfEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deletePf(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PfRepository;
