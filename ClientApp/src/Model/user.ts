import { BaseModel } from '../Model/BaseModel';
import { user_role } from './user_role';

export class user extends BaseModel {
  status: string;
  user_name: string;
  password: string;
  signature: string;
  api_token: string;
  team_id : number;
  is_leader : boolean;
  user_role_id: number;
  user_role: user_role;
  old_guid : string;
  old_session_id : string;
}

