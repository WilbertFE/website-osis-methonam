import { NextResponse } from "next/server";
import { updateUser } from "@/lib/firebase/service";

export async function PUT(req: Request) {
  try {
    // Parse JSON body from the request
    const body = await req.json();
    const { fullname, username, bio, oldUsername } = body;

    // Validasi input
    if (!fullname || !username || !bio || !oldUsername) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          statusCode: 400,
          newUsername: null,
        },
        { status: 400 }
      );
    }

    // Contoh: Simulasi menyimpan data ke database
    const newUser = {
      fullname,
      username,
      bio,
    };

    // Logika database dapat ditambahkan di sini
    const { statusCode, message, newUsername } = await updateUser(
      newUser,
      oldUsername
    );
    return NextResponse.json(
      { message, statusCode, newUsername },
      { status: statusCode }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the user.",
        statusCode: 500,
        newUsername: null,
      },
      { status: 500 }
    );
  }
}
