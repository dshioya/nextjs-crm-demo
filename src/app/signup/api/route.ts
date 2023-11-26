'use server'

import {NextRequest, NextResponse} from 'next/server'
import {validate} from '@/validation'
import {signupValidationSchema} from '@/validation/signup'
import {create} from './service'
import crypto from 'crypto'
import {MemcacheClient} from 'memcache-client';

const server = 'localhost:11211';

const memcachedClient = new MemcacheClient({ server });

import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  let requestBody

  try {
    requestBody = await request.json()
  } catch (e) {
    return NextResponse.json({
      success: false
    }, {
      status: 400
    })
  }

  // バリデーションチェック
  const {isValid, errors} = await validate(signupValidationSchema, requestBody)

  if (isValid) {
    // ユーザーを新規登録
    const user = await create(requestBody)

    // ユーザーIDをセッションIDに割り当て
    // TODO: リファクタ
    const sessionId = crypto.randomUUID().replaceAll('-', '')
    cookies().set('SESSION_ID', sessionId)
    await memcachedClient.set(`user_${sessionId}`, user.id)

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        loginId: user.loginId,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  } else {
    return NextResponse.json({
      success: false,
      errors: errors
    }, {
      status: 400
    })
  }
}
