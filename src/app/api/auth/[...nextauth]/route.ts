import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: '420082817479-9tt9jgcfel3hdar7p44s7ms1tdl0a53u.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log(arguments)
  //
  //     console.log(cookies().get('oauth_feature'))
  //
  //     cookies().delete('oauth_feature')
  //
  //     return false
  //   },
  //   async redirect({ url, baseUrl }) {
  //     console.log(url, baseUrl)
  //
  //     if (url.endsWith('/signup')) {
  //       cookies().set('oauth_feature', 'signup')
  //     } else if (url.endsWith('/login')) {
  //       cookies().set('oauth_feature', 'login')
  //     }
  //
  //     return baseUrl
  //   },
  // }
})

export { handler as GET, handler as POST }
