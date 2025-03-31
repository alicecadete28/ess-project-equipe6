import BaseEntity from './base.entity';

export default class ReservationEntity extends BaseEntity {
  pf_id: string;
  room_id: string;
  check_in: Date;
  check_out: Date;
  guests: number;
  total: number;
  status: string;
  rating: {
    stars: number;
    comment: string;
  };
  confirmed: boolean;

  constructor(data: Partial<ReservationEntity>) {
    super(data.id || '');
    this.pf_id = data.pf_id || '';
    this.room_id = data.room_id || '';
    this.check_in = data.check_in ? new Date(data.check_in) : new Date();
    this.check_out = data.check_out ? new Date(data.check_out) : new Date();
    this.guests = data.guests ?? 1;
    this.total = data.total ?? 0;
    this.status = data.status ?? 'pending';
    this.rating = data.rating ?? { stars: 0, comment: '' };
    this.confirmed = data.confirmed ?? false;
  }
}
