import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "../../lib/prisma";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/flac"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Unsupported file type" });
    }
    const title = formData.get("title");
    const duration = formData.get("duration");

    // Check for required fields
    if (!file || !title || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define the upload path
    const uploadsDir = path.join(process.cwd(), "uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Define the full file path
    const filePath = path.join(uploadsDir, file.name);

    // Write the file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Create a track record in the database
    const track = await prisma.track.create({
      data: {
        title: title,
        duration: parseInt(duration),
        filePath: `uploads/${file.name}`, // Assuming you're saving the file in the 'uploads' directory
      },
    });

    return NextResponse.json(track, { status: 201 });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
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

      return NextResponse.json(track, { status: 200 });
    } else {
      const tracks = await prisma.track.findMany();
      return NextResponse.json(tracks, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
