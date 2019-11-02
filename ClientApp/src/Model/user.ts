import { BaseModel } from '../Model/BaseModel';
import { user_role } from './user_role';

export class user extends BaseModel {
  UserName: string;
  Password: string;
  Email: string;
  Token: string;
}

