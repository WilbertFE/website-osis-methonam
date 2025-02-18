/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createAgenda,
  createJournal,
  deleteJournal,
  getAgendas,
  getJournals,
  updateJournal,
} from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, date } = body;

    if (!title || !content) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    const { statusCode, message } = await createAgenda({
      title,
      // date,
      content,
    });

    return NextResponse.json(
      {
        message,
        statusCode,
      },
      { status: statusCode }
    );
  } catch (e) {
    console.log("error while creating agenda : ", e);
    return NextResponse.json(
      {
        message: "An error occurred while creating agenda.",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { statusCode, message, agendas } = await getAgendas();
    return NextResponse.json(
      { statusCode, message, agendas },
      { status: statusCode }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { statusCode: 500, message: "Server error", agendas: null },
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
