import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listContentsInteractor from '../interactors/listContentsInteractor';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';

export default async function listContentsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/contents GET');

	try {
		let repo = new ContentRepositoryPrisma();
		let contents = await listContentsInteractor(repo);
		return res.send(contents);
	}
	catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
