import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const filePath = url.searchParams.get('file');
  if (!filePath) {
    return new Response(JSON.stringify({ error: 'File parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const decodedFilePath = decodeURIComponent(filePath);
  const fullPath = path.join(process.cwd(), 'public', decodedFilePath);

  try {
    // Ensure the resolved path is within the 'public' directory
    if (!fullPath.startsWith(path.join(process.cwd(), 'public'))) {
      throw new Error('Invalid file path');
    }

    const fileContent = await fs.readFile(fullPath);
    return new Response(fileContent, {
      status: 200,
      headers: { 'Content-Type': 'audio/mp3' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
