/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createJournal,
  deleteJournal,
  getJournals,
  updateJournal,
} from "@/lib/firebase/service";
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

    const { statusCode, message } = await createJournal({
      title,
      tagline,
      content,
      credit,
    });

    return NextResponse.json(
      {
        message,
        statusCode,
      },
      { status: statusCode }
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

export async function GET(req: Request) {
  try {
    const { statusCode, message, journals } = await getJournals();
    return NextResponse.json(
      { statusCode, message, journals },
      { status: statusCode }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: "Server error", journals: null },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const { statusCode, message } = await deleteJournal(id);
    return NextResponse.json({ statusCode, message }, { status: statusCode });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, tagline, credit } = body;

    const { statusCode, message } = await updateJournal({
      id,
      title,
      content,
      tagline,
      credit,
    });
    return NextResponse.json({ statusCode, message }, { status: statusCode });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: "Server error" },
      { status: 500 }
    );
  }
}
