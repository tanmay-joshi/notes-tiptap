import prisma from '@/prisma'
import { user } from '@prisma/client'
import { profile } from 'console'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GoogleProfile } from 'next-auth/providers/google'
import GoogleProvider from "next-auth/providers/google";


export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRECT as string,
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log(user, account, profile)
                if (account?.provider === 'google') {
                    const myprofile = profile as GoogleProfile
                    // console.log(myprofile, profile)
                    const userExist = await prisma.user.count({
                        where: {
                            username: myprofile.email as string
                        }
                    })
                    if (userExist == 0){
                         try {
                        const user = await prisma.user.create({
                            data: {
                                name: profile?.name as string,
                                username: myprofile.email as string,
                            } as user
                        })
                        console.log(user)
                        const meaccount = await prisma.account.create({
                            data:{
                                providerAccountId: user.id.toString(),
                                provider: account.provider,
                                user: {
                                    connect: {
                                        id: user?.id as string
                                    }
                                }
                            }
                        })
                        console.log(meaccount)
                        return Promise.resolve(true)
                    } catch (error) {
                        Promise.resolve(true)
                    }
                    }
                    else {
                        const accountExist = await prisma.account.count({
                            where: {
                                providerAccountId: myprofile.id.toString() as string
                            }
                        })

                        if (accountExist == 0){
                            try {
                                const meaccount = await prisma.account.create({
                                    data:{
                                        providerAccountId: myprofile.id.toString(),
                                        provider: account.provider,
                                        user: {
                                            connect: {
                                                id: user?.id as string
                                            }
                                        }
                                    }
                                })
                                console.log(meaccount)
                                return Promise.resolve(true)
                            } catch (error) {
                                Promise.resolve(true)
                            }
                        }
                    }
            return Promise.resolve(true)
        }
        else if (account?.provider === 'credentials') {

        }
        return Promise.resolve(true)
    },
    async jwt({token, user}) {
        if (user) {
            token.uid = user.id;
        }
        return Promise.resolve(token);
    },
    async session({ session, token, user }) {
        if (token) {
            const id = await prisma.user.findFirst({
                where: {
                    account: {
                        some: {
                            providerAccountId: token.uid as string
                        }
                    }
                }
            })
            session.user = {
                ...session.user,
                email: id?.id as string
            }
            // console.log("```````````````````",session, token, user)
        }
        return Promise.resolve(session);
    }
}
}