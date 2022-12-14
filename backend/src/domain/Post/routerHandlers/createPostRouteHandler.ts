import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createPostInteractor from '../interactors/createPostInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';
import PostEntity from '../PostEntity';

export default async function createPostRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/posts POST');

	try {
		let newPost = new PostEntity({
			id: undefined,
			title: req.query.title as string,
			date: req.query.date as string,         //Date
			owner: req.query.owner as string,       //User
			LinkedEntity: req.query.LinkedEntity as string,
			LinkedEntityId: req.query.LinkedEntityId as string,
		});
		// newPost.validate();
		let repo = new PostRepositoryPrisma();
		let post = await createPostInteractor(repo, newPost);
		return res.send(post);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
