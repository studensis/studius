import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useState } from "react";
import { isErrored } from "stream";
import {prisma} from '../../../lib/prisma'
import React from 'react'
import { Student } from "../../../typings";
import { Role } from "@prisma/client";
import userpage from "../../userpage";
import { useRouter } from "next/router";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            type: 'credentials',
            credentials: {
            },
            async authorize(credentials, req){
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                
                let user = null

                try {
                    const userP = await prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    })
                    user = userP
                    
                } catch (error) {
                    throw error
                }

                let user1 = {...user,password:"HIDDEN"}
                let userString = JSON.stringify(user1);
                
                
                if( user.email == email && user.password == password) {
                    
                    return {
                        id: user.id,
                        name: userString, 
                        email:user.role,
                        surname: user.surname
                    }
                }
                else throw new Error('Wrong Username or Password')
                
                

                // if((email !== "franko@gmail.com" || password !== "123456") && (email !== "sonja@gmail.com" || password !== "123456")) {
                //     throw new Error('smrdis')
                // }
                // return {id: "123456", name:user.name, email:email }
            }
            
        })
    ],

    pages: {
        signIn: "/auth/login"
    },


}

export default NextAuth(authOptions);