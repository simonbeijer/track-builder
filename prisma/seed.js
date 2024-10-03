const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.track.createMany({
    data: [
      { title: "Song 1", artist: "Artist 1", duration: 210 },
      { title: "Song 2", artist: "Artist 2", duration: 180 },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
