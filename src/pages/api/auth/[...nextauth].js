import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/SignIn",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH,
});
