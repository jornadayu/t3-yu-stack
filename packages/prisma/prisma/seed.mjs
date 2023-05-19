import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const task1 = await prisma.task.upsert({
    where: { id: 'clhqr3ktk000008l2179i1jws' },
    update: {},
    create: {
      description: 'wash the dishes',
      user_id: 'user1',
      id: 'clhqr3ktk000008l2179i1jws',
      created_at: new Date(),
      updated_at: new Date(),
    },
  })
  const task2 = await prisma.task.upsert({
    where: { id: 'clhqr3tt2000108l2fifffics' },
    update: {},
    create: {
      description: 'finish the template',
      user_id: 'user1',
      id: 'clhqr3tt2000108l2fifffics',
      created_at: new Date(),
      updated_at: new Date(),
    },
  })
  console.log({ task1, task2 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()

    process.exit(1)
  })
