import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline', // 인증 코드와 refresh token을 얻기 위해 필요
          response_type: 'code', // 인증 코드를 받기 위해 필요
          prompt: 'consent', // 매번 사용자 동의를 강제 (선택적)
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
