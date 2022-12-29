import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listPostsInteractor from '../interactors/listPostsInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

export default async function listPostsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/posts GET');

	try {
		let repo = new PostRepositoryPrisma();
		let posts = await listPostsInteractor(repo);
		return res.send(posts);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
