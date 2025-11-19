export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
}

export interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
