const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Delete existing records (optional)
  await prisma.track.deleteMany();

  // Create new tracks with the releaseDate
  await prisma.track.createMany({
    data: [
      {
        title: 'Track 1',
        duration: 180,
        filePath: 'uploads/track1.mp3',
      },
      {
        title: 'Track 2',
        duration: 240,
        filePath: 'uploads/track2.mp3',
      },
      // Add more tracks as needed
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
