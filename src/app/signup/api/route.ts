import {NextResponse} from 'next/server'
import {validate} from '@/validation'
import {signupValidationSchema} from '@/validation/signup'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
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
    // TODO: ログインIDのチェック

    // TODO: 仮
    return NextResponse.json({
      success: true
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
