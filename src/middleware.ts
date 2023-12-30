import { NextRequest, NextResponse } from 'next/server'
import { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: JWT | null } }) {
    const token = req.nextauth.token
    let expiredAt: number = 0

    if (token && typeof token.exp === 'number') {
      // expはエポック秒なのでミリ秒単位にしている
      expiredAt = token.exp * 1000
    }

    if (new Date().getTime() < expiredAt) {
      // 認証OK
      if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/customer/list', req.url))
      } else {
        return NextResponse.next()
      }
    } else {
      // 認証NG
      if (req.nextUrl.pathname === '/') {
        return NextResponse.next()
      } else {
        // トップページ以外の場合はトップページに戻す
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      // 認可に関する処理。ロールが `admin` ならOK
      authorized: ({req, token}) => {
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/', '/customer/list'],
}
