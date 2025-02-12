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
import { Journal } from "@/types/Journal";

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
    fullname: string;
    username: string;
    bio: string;
  },
  oldUsername: string
) {
  const user = await getUserByUsername(oldUsername);

  if (!user) return { statusCode: 404, message: "User not found!" };

  // if user not exists
  if (user.length === 0) return { statusCode: 404, message: "User not found!" };

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

// journal
export async function createJournal({
  title,
  tagline,
  credit,
  content,
}: Journal) {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "journals"), {
      title,
      tagline,
      credit,
      content,
      created_at: now,
      updated_at: now,
    });
    return { statusCode: 200, message: "Journal added" };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Server error" };
  }
}

export async function getJournals() {
  try {
    const querySnapshot = await getDocs(collection(db, "journals"));
    const journals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Journal[];
    return { statusCode: 200, message: "GET Journals", journals };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Server error", journals: null };
  }
}

export async function deleteJournal(id: string) {
  try {
    await deleteDoc(doc(db, "journals", id));
    return { statusCode: 200, message: "Journal deleted" };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Server error" };
  }
}

export async function updateJournal(data: any) {
  try {
    const now = new Date().toISOString();
    const journalRef = doc(db, "journals", data.id);
    await updateDoc(journalRef, { ...data, updated_at: now });
    return { statusCode: 200, message: "Success! Journal updated" };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: "Server error" };
  }
}
