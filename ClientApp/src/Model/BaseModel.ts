export class BaseModel {
  id: number = 0;
  status: boolean = true;
  created_by_id: number;
  created_on: Date;
  updated_by_id: number;
  updated_on: Date;
}
