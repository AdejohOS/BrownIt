import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "./db";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { nanoid } from 'nanoid'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID as string, // use as string or !
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // use as string or !

        }),
    ],
    callbacks: {
        async session({token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.image = token.picture
                session.user.email = token.email
                session.user.username = token.username
            }

            return session
        },

        async jwt({ user, token}) {
            const dbUser = await db.user.findFirst({
                where: {
                    email:  token.email,
                },
            });

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            if (!dbUser.username) {
                await db.user.update({
                    where: {
                        id: dbUser.id,
                    },

                    data: {
                        username: nanoid(10)
                    }
                })
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                username: dbUser.username,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },

        redirect() {
            return '/'
        }

    }

}

export const getAuthSession = () => getServerSession(authOptions)