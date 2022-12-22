import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createContentInteractor from '../interactors/createContentInteractor';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';
import ContentEntity from '../ContentEntity';
import { LinkedEntity } from '@prisma/client';

export default async function createContentRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/contents POST');

	try {
		let newContent = new ContentEntity({
			id: req.query.id as string,
			markdownText: req.query.markdownText as string,
			plainText: req.query.plainText as string,
			date: undefined,                 // Date
			linkedEntity: req.query.linkedEntity as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string
		});
		// newContent.validate();
		let repo = new ContentRepositoryPrisma();
		let content = await createContentInteractor(repo, newContent);
		return res.send(content);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
