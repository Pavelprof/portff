import CredentialsProvider from "next-auth/providers/credentials";

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
          `${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/token/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const resData = await res.json();
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          accessToken: resData.access,
          refreshToken: resData.refresh,
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
      console.log("jwt callback", { token, user, session });
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          },
        };
      }
      return session;
    }
  }
};
