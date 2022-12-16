import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getPostInteractor from '../interactors/getPostInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

export default async function getPostRouteHandler(req: Request, res: Response) {
	console.log('/posts/:postId GET');

	try {
		let id = String(req.params.postId);
		let repo = new PostRepositoryPrisma();
		let post = await getPostInteractor(repo, id);
		return res.send(post);
	} catch {
		return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
