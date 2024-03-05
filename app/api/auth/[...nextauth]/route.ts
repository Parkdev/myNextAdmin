import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
