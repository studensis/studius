import { LinkedEntity, Semester, Status } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateContentInteractor from '../interactors/updateContentInteractor';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';
import ContentEntity from '../ContentEntity';


export default async function updateContentRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`contents/${req.params.contentId} PUT`);

    try{
        let  contentData = new ContentEntity({
            id: req.params.contentId as string,
			markdownText: req.query.markdownText as string,
			plainText: req.query.plainText as string,
			date: new Date(Date.parse(String(req.query.date))) as Date,
			linkedEntity: (String(req.query.linkedEntity)).toUpperCase() as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string
        });
        let repo = new ContentRepositoryPrisma();
        let updatedContent = await updateContentInteractor(repo,contentData);
        return res.send(updatedContent);
    }
    catch(err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
     }
}
