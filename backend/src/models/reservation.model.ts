import BaseModel from './base.model';

export default class ReservationModel extends BaseModel {
  pf_id: string;
  room_id: string;
  check_in: Date;
  check_out: Date;
  guests: number;
  total: number;
  status: string;
  rating: number;
  confirmed: boolean;

  constructor(data: ReservationModel) {
    super(data.id || '');
    this.pf_id = data.pf_id;
    this.room_id = data.room_id;
    this.check_in = new Date(data.check_in);
    this.check_out = new Date(data.check_out);
    this.guests = data.guests;
    this.total = data.total;
    this.status = data.status;       
    this.rating = data.rating;       
    this.confirmed = data.confirmed; 
  }
}
