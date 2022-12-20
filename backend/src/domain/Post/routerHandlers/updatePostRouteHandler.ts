import { LinkedEntity, Semester, Status } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updatePostInteractor from '../interactors/updatePostInteractor';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';
import PostEntity from '../PostEntity';


export default async function updatePostRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`posts/${req.params.postId} PUT`);

    try{
        let  postData = new PostEntity({
            id: req.params.postId as string,
			title: req.query.title as string,
			ownerId: req.query.ownerId as string,
			linkedEntity: req.query.linkedEntity as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
			contentId: req.query.contentId as string,
			date: undefined	
        });
        let repo = new PostRepositoryPrisma();
        let updatedPost = await updatePostInteractor(repo,postData);
        return res.send(updatedPost);
    }
    catch(err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
     }
}
