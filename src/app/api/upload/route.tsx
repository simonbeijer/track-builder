import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../lib/prisma";

// POST handler with TypeScript typings
export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const duration = formData.get("duration") as string | null;

    if (!file || !title || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("file:", file); // Should log file object
    console.log("filetype:", file.type); // Should log file type
    console.log("title:", title); // Should log title string
    console.log("duration:", duration); // Should log duration number

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/flac"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Define the upload path
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Define the full file path
    const uniqueFilename = uuidv4() + path.extname(file.name);
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Write the file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Create a track record in the database
    const track = await prisma.track.create({
      data: {
        title: title,
        duration: parseInt(duration, 10),
        filePath: `/uploads/${uniqueFilename}`, // Assuming you're saving the file in the 'uploads' directory
      },
    });

    console.log("Track filePath from DB:", track.filePath);

    return NextResponse.json(track, { status: 201 });
  } catch (error: unknown) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET handler with TypeScript typings
export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const track = await prisma.track.findUnique({
        where: { id: Number(id) },
      });

      if (!track) {
        return NextResponse.json({ error: "Track not found" }, { status: 404 });
      }

      console.log("Track filePath:", track.filePath);

      const fileUrl = `/api/serveAudio?file=${encodeURIComponent(
        track.filePath
      )}`;

      return NextResponse.json(
        {
          ...track,
          streamUrl: fileUrl,
        },
        { status: 200 }
      );
    } else {
      const tracks = await prisma.track.findMany();
      return NextResponse.json(tracks, { status: 200 });
    }
  } catch (error: unknown) {
    console.error("Error fetching track:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
