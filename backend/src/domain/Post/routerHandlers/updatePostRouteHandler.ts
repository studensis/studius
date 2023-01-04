import { LinkedEntity } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updatePostInteractor from '../interactors/updatePostInteractor';
import PostEntity from '../PostEntity';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

export default async function updatePostRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`posts/${req.params.postId} PUT`);

	try {
		let postData = new PostEntity({
			id: req.params.postId as string,
			title: req.query.title as string,
			ownerId: req.query.ownerId as string,
			linkedEntity: String(
				req.query.linkedEntity
			).toUpperCase() as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
			contentId: req.query.contentId as string,
			date: new Date(Date.parse(String(req.query.date))) as Date,
		});
		let repo = new PostRepositoryPrisma();
		let updatedPost = await updatePostInteractor(repo, postData);
		return res.send(updatedPost);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
