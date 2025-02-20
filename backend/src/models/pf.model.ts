import BaseModel from './base.model';

export default class PFModel extends BaseModel {
  user_id: string;
  name: string;
  birth_date: Date;
  cpf: string;
  phone: string;
  favorites: string[];
  savedRooms: string[];

  constructor(data: PFModel) {
    super(data.id || '');
    this.user_id = data.user_id;
    this.name = data.name;
    this.birth_date = data.birth_date;
    this.cpf = data.cpf;
    this.phone = data.phone;
    this.favorites = data.favorites;
    this.savedRooms = data.savedRooms;
  }
}
