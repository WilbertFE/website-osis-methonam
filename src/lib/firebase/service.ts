/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  addDoc,
  deleteDoc,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./init";
import { doc, collection, getDocs } from "firebase/firestore";
import { User } from "@/types/User";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

// user
export async function loginWithGoogle(
  data: { name: string; email: string; image: string },
  callback: any
) {
  const q = query(collection(db, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];

  // if register
  if (user.length === 0) {
    const newUser: User = {
      email: data.email,
      fullname: data.name,
      username: `user-${uuidv4()}`,
      bio: "Describe yourself.",
      image: data.image,
      role: "member",
    };
    const now = new Date().toISOString();

    await addDoc(collection(db, "users"), {
      ...newUser,
      created_at: now,
      updated_at: now,
    }).then(() => {
      callback({
        status: true,
        data: {
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          image: newUser.image,
          fullname: newUser.fullname,
        },
      });
    });
  }
  // if login
  if (user.length > 0) {
    if (user[0].id) {
      await updateDoc(doc(db, "users", user[0].id), data).then(() => {
        callback({
          status: true,
          data: {
            email: user[0].email,
            username: user[0].username,
            image: data.image,
            fullname: user[0].fullname,
            role: user[0].role,
          },
        });
      });
    }
  }
}

export async function getUserByUsername(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[] | [];

  if (user.length === 0) {
    return null;
  }

  return user;
}

export async function getUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[] | [];

  if (user.length === 0) return null;

  return user;
}

export async function updateUser(
  data: {
    username: string;
    bio: string;
  },
  oldUsername: string
) {
  const user = await getUserByUsername(oldUsername);

  if (!user) return { statusCode: 404, message: "User not found!" };

  // if has space
  if (data.username.includes(" "))
    return {
      statusCode: 400,
      message: "Username cannot include space characters",
    };

  // if success
  const ref = doc(collection(db, "users"), user[0].id);

  return await updateDoc(ref, data)
    .then(() => ({
      statusCode: 200,
      message: "User data updated sucessfully!",
    }))
    .catch(() => ({
      statusCode: 500,
      message: "Server error!",
    }));
}
