import BaseRepository from './base.repository';
import PjEntity from '../entities/pj.entity';

class PjRepository extends BaseRepository<PjEntity> {
  constructor() {
    super('pjs');
  }

  public async getPjs(): Promise<PjEntity[]> {
    return await this.findAll();
  }

  public async getPjById(id: string): Promise<PjEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async getPjByUserId(userId: string): Promise<PjEntity | null> {
    return await this.findOne((item) => item.user_id === userId);
  }

  public async getPjByCnpj(cnpj: string): Promise<PjEntity | null> {
    return await this.findOne((item) => item.cnpj === cnpj);
  }

  public async createPj(data: PjEntity): Promise<PjEntity> {
    return await this.add(data);
  }

  public async updatePj(id: string, data: PjEntity): Promise<PjEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deletePj(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default PjRepository;
