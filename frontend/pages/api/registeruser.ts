import {prisma} from "../../lib/prisma"
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {name, surname, email, JMBAG, password, username}= req.body
    try {
        await prisma.user.create({
            data: {
                name,
                surname,
                email,
                JMBAG,
                password,
                username,
            }
        })
        res.status(200).json({message: 'Note created'})
    } catch (error) {
        console.log("Failure")
    }
} 