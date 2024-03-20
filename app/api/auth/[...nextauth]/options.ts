import { DefaultSession, Session, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import AzureADProvider from 'next-auth/providers/azure-ad';
// import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    access_token: string | unknown;
  }
}

const Scopes = [
  'VDIWorkspaces.Read.All',
  'VDIWorkspaces.ReadWrite.All',
  'VMImages.Read.All',
  'VMImages.ReadWrite.All',
  'VMImageVersions.Read.All',
  'VMImageVersions.ReadWrite.All',
];

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      idToken: true,
      authorization: {
        params: {
          scope: `openid profile email User.Read ${Scopes.map(
            scope => `api://7c8a786a-cff2-4375-bc7e-5d7b83bfcb7a/${scope}`,
          ).join(' ')}`,
          //   withExtraScopeToConsent:
          //     'api://7c8a786a-cff2-4375-bc7e-5d7b83bfcb7a/.default',
        },
      },
    }),

    // https://login.microsoftonline.com/
    //common/oauth2/v2.0/
    //authorize?client_id=7c8a786a-cff2-4375-bc7e-5d7b83bfcb7a&
    //scope=openid%20profile%20email%20User.Read&
    //response_type=code&
    //redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2F//
    //azure-ad&state=X-7HTx8cXPGAq4MAas9Nb5DAUVlEmAXAhk1rKCoqF-Q

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
      console.log('account', account);
      console.log('token', token);
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
