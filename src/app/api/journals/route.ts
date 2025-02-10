// import { createJournal } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, tagline, content, credit } = body;

    if (!title || !tagline || !content || !credit) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // const { statusCode, message } = await createJournal({
    //   title,
    //   tagline,
    //   content,
    //   credit,
    // });

    return NextResponse.json(
      {
        message: "success",
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("error while creating journal : ", e);
    return NextResponse.json(
      {
        message: "An error occurred while creating journal.",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
