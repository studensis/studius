import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getContentInteractor from '../interactors/getContentInteractor';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';

export default async function getContentRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`contents/${req.params.contentId} GET`);

	try {
		let id = String(req.params.contentId);
		let repo = new ContentRepositoryPrisma();
		let content = await getContentInteractor(repo, id);
		return res.send(content);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
