import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "CoolInvestor777",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "uSEr1234",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_PORTF_URL}/api/v1/token/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const resData = await res.json();
        const decoded = jwt.decode(resData.access);

        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          accessToken: resData.access,
          refreshToken: resData.refresh,
          expiresAt: new Date(decoded.exp * 1000).toISOString(),
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      }
      return token;
    },
    async session({ session, token, user }) {      
      if (token) {
        if (token.expiresAt && new Date(token.expiresAt) < new Date()) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_PORTF_URL}/api/v1/token/refresh/`,
            {
              method: "POST",
              body: JSON.stringify({ refresh: token.refreshToken }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const resData = await res.json();
          const decoded = jwt.decode(resData.access);

          token.accessToken = resData.access;
          token.refreshToken = resData.refresh;
          token.expiresAt =  new Date(decoded.exp * 1000).toISOString();
        }


        return {
          ...session,
          user: {
            ...session.user,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiresAt: token.expiresAt,
          },
        };
      }
      return session;
    }
  }
};