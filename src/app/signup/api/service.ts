'use server'

import SignupData from '@/model/SignupData';
import bcrypt from 'bcrypt'
import {PrismaClient, Prisma, User} from '@prisma/client'

const saltRounds = 10;

export function create(params: SignupData) {
  const prismaClient = new PrismaClient()

  return prismaClient.$transaction(async prisma => {
    // ログインIDのチェック
    const users = await prisma.$queryRaw<User[]>(
      Prisma.sql`SELECT * FROM user WHERE login_id = ${params.loginId} FOR UPDATE`
    )

    if (users.length > 0) {
      throw `This loginId('${params.loginId}') is already exists.`
    }

    return prisma.user.create({
      data: {
        loginId: params.loginId,
        password: bcrypt.hashSync(params.password, saltRounds),
        name: params.name,
      }
    })
  }).finally(() => {
    prismaClient.$disconnect()
  })
}
