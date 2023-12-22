import connectToMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async signIn({ user, account }) {
            console.log("user => ", user)
            console.log("account => ", account)
            if (account.provider === "google") {
                const { name, email } = user;
                try {
                    await connectToMongoDB();
                    const userExists = await User.findOne({ email });

                    console.log("user => ", userExists)

                    if (!userExists) {
                        const res = await fetch("http://localhost:3000/api/user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                password: account.access_token,
                                loginType: "sso"
                            }),
                        });

                        if (res.ok) {
                            this.redirect('/pages/dashboard')
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (account.provider === "credentials") {
                console.log("shahid => ", account)
                const { email, password } = user;
                // try {
                //     const res = await fetch("http://localhost:3000/api/login", {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify({
                //             email,
                //             password,
                //             loginType: "normal"
                //         }),
                //     });

                //     console.log("re", res)

                //     if (res.ok) {
                //         this.redirect('/pages/dashboard')
                //     }

                // } catch (error) {
                //     console.log(error);
                // }
            }
            return user;
        },
    },
    // adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };