import BaseEntity from './base.entity';

export default class RoomEntity extends BaseEntity {
  pj_id: string;
  description: string;
  type: string;
  price: number;
  capacity: number;
  caracteristics_ids: string[];
  local: string;

  constructor(data: RoomEntity) {
    super(data.id || '');
    this.pj_id = data.pj_id;
    this.description = data.description;
    this.price = data.price;
    this.type = data.type;
    this.capacity = data.capacity;
    this.caracteristics_ids = data.caracteristics_ids;
    this.local = data.local;
  }
}
