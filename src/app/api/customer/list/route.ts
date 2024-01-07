import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)

  const page = +(searchParams.get('page') || 0)
  const limit = +(searchParams.get('limit') || 5)
  const skip = (page || 1 - 1) * limit

  const customers = await prisma.customer.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'asc'
    }
  })

  const total = await prisma.customer.count()

  return Response.json({
    items: customers,
    total
  })
}
