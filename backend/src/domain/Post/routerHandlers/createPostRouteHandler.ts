import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createPostInteractor from '../interactors/createPostInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';
import PostEntity from '../PostEntity';
import { LinkedEntity } from '../LinkedEntity'

export default async function createPostRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/posts POST');

	try {
		let newPost = new PostEntity({
			id: undefined,
			title: req.query.title as string,       //Date
			ownerId: req.query.ownerId as string,       //User
			linkedEntity: req.query.linkedEntity as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
			contentId: req.query.contentId as string,
			date: undefined
		});
		// newPost.validate();
		let repo = new PostRepositoryPrisma();
		let post = await createPostInteractor(repo, newPost);
		return res.send(post);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}