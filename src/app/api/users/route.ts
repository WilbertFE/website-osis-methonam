import { NextResponse } from "next/server";
import { updateUser } from "@/lib/firebase/service";

export async function PUT(req: Request) {
  try {
    // Parse JSON body from the request
    const body = await req.json();
    const { username, bio, oldUsername } = body;

    // Validasi input
    if (!username || !bio || !oldUsername) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Contoh: Simulasi menyimpan data ke database
    const newUser = {
      username,
      bio,
    };

    // Logika database dapat ditambahkan di sini
    const { statusCode, message } = await updateUser(newUser, oldUsername);
    return NextResponse.json({ message, statusCode }, { status: statusCode });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the user.",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
