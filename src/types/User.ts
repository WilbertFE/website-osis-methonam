import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  email: string;
  type: string;
  fullname: string;
  username: string;
  role?: string;
  image: string;
  created_at?: Timestamp;
  updated_at?: Timestamp;
  bio: string;
};
