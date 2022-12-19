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
		res.send(posts);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
