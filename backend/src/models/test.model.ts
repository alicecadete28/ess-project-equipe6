import BaseModel from './base.model';

export default class TestModel extends BaseModel {
  pj_id: string;
  description: string;
  type: string;
  price: number;
  capacity: number;
  caracteristics_ids: string[];
  constructor(data: TestModel) {
    super(data.id || '');
    this.pj_id = data.pj_id;
    this.description = data.description;
    this.type = data.description;
    this.price = data.price;
    this.capacity = data.capacity;
    this.caracteristics_ids = data.caracteristics_ids;
  }
}
