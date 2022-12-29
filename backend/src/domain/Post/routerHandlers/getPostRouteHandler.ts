import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getPostInteractor from '../interactors/getPostInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

export default async function getPostRouteHandler(req: Request, res: Response) {
	console.log(`posts/${req.params.postId} GET`);

	try {
		let id = String(req.params.postId);
		let repo = new PostRepositoryPrisma();
		let post = await getPostInteractor(repo, id);
		return res.send(post);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
