/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  addDoc,
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

// login
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
      type: "google",
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
            email: data.email,
            username: user[0].username,
            image: data.image,
            fullname: data.name,
            role: user[0].role,
          },
        });
      });
    }
  }
}

// user
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

// export async function updateUser(
//   data: {
//     fullname: string;
//     username: string;
//     bio: string;
//   },
//   oldUsername: string
// ) {
//   const q = query(
//     collection(db, "users"),
//     where("username", "==", oldUsername)
//   );
//   const snapshot = await getDocs(q);

//   const user = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as User[] | [];

//   // if user not exists
//   if (user.length === 0)
//     return { statusCode: 404, message: "User not found", newUsername: null };

//   // if success
//   const ref = doc(collection(db, "users"), user[0].id);

//   return await updateDoc(ref, data)
//     .then(() => ({
//       statusCode: 200,
//       message: "User data updated sucessfully",
//       newUsername: data.username,
//     }))
//     .catch(() => ({
//       statusCode: 500,
//       message: "Server error",
//       newUsername: null,
//     }));
// }
