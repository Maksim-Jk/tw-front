export interface IUser {
  id: number | null;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface IUserState extends IUser {
  isAuthenticated: boolean;
}
