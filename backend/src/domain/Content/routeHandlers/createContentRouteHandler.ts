import { LinkedEntity } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createContentInteractor from '../interactors/createContentInteractor';
import { ContentEntity } from '../model/ContentEntity';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';

export default async function createContentRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/contents POST');

	try {
		let newContent: ContentEntity = {
			id: req.query.id as string,
			markdownText: req.query.markdownText as string,
			plainText: req.query.plainText as string,
			date: new Date(Date.parse(String(req.query.date))) as Date,
			linkedEntity: String(
				req.query.linkedEntity
			).toUpperCase() as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
		};
		// newContent.validate();
		let repo = new ContentRepositoryPrisma();
		let content = await createContentInteractor(repo, newContent);
		return res.send(content);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
