import NextAuth from 'next-auth'
import AzureADProvider from '@next-auth/azure-ad-provider'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT-ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      // tenantId: process.env.AZURE_AD_TENANT_ID
    }),
    // ...add more providers here
  ],
})