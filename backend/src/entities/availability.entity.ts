import BaseEntity from './base.entity';

export default class AvailabilityEntity extends BaseEntity {
  room_id: string;
  init_date: Date;
  last_date: Date;

  constructor(data: AvailabilityEntity) {
    super(data.id || '');
    this.room_id = data.room_id;
    this.init_date = data.init_date;
    this.last_date = data.last_date;
  }
}
