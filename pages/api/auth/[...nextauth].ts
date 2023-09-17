import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database";
import { signIn, signOut } from 'next-auth/react';
import jwt from "jsonwebtoken";




export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [    
        Credentials({
            name: 'Custon Login',
            credentials: {
                email: { label:'Correo', type:'email', placeholder: 'correo@google.com' },
                password: { label:'Contraseña', type:'password', placeholder:'Contraseña' },
            },
            async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(
                    credentials!.email, 
                    credentials!.password 
                ) as any
            },
            
        }),     
  ],

  pages: {
    signIn: '/auth/login',
  },

  session: {
    maxAge: 2592000, // 30 dias
    strategy: 'jwt',
    updateAge: 86400, // 1 dia
  },

  callbacks: {

    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions as any);