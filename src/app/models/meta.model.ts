import { User } from "./user.model";

export interface MetaData {
  isLogged: boolean;
  currentUser: User;
}
