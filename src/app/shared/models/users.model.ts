interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  loading: boolean;
}

export interface UsersState {
  usersList: User[];
  loading: boolean;
}

export const initialState: UsersState = {
  usersList: [],
  loading: true,
};

export type UserKey = keyof User;

export interface UserDetailsComponentProps {
  userId: number;
  showSeePosts: boolean;
}
