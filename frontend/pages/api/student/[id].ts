import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { avatar_url } = req.body;
	const studentId = req.query.id;

	if (req.method === 'DELETE') {
		const student = await prisma.user.delete({
			where: { id: Number(studentId) },
		});
		res.json(student);
		return;
	} else if (req.method === 'POST') {
		const student = await prisma.user.update({
			where: { id: Number(studentId) },
			data: {
				avatar_url,
			},
		});
		res.json(student);
		return;
	} else {
		console.log('Student could not be updated/deleted');
	}
}

// BEZ PRISME U FRONTENDU !!!
