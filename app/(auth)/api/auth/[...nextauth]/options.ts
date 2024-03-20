import { DefaultSession, Session, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import AzureADProvider from 'next-auth/providers/azure-ad';
// import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    access_token: string | unknown;
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      idToken: true,
      authorization: {
        params: {
          scope:
            'openid profile email User.Read api://7c8a786a-cff2-4375-bc7e-5d7b83bfcb7a/.default',
        },
      },
    }),
    //로그인 이름과 비밀번호로 로그인 (임시)
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'Username' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     const user = {
    //       id: '42',
    //       name: 'test1',
    //       password: 'test!',
    //     };
    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.access_token = token.access_token;
      return session;
    },
  },
};
