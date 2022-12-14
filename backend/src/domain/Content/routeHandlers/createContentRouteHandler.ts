import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createContentInteractor from '../interactors/createContentInteractor';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';
import ContentEntity from '../ContentEntity';

export default async function createContentRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/contents POST');

	try {
		let newContent = new ContentEntity({
			id: undefined,
			Markdown_Text: req.query.Markdown_Text as string,
			plain_text: req.query.plain_text as string,
			date: req.query.date as string,                 // Date
		});
		// newContent.validate();
		let repo = new ContentRepositoryPrisma();
		let content = await createContentInteractor(repo, newContent);
		return res.send(content);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
