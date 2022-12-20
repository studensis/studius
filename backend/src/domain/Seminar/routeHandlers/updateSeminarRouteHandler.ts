import { Semester, Status } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateSeminarInteractor from '../interactors/updateSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';
import SeminarEntity from '../SeminarEntity';


export default async function updateSeminarRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`seminars/${req.params.seminarId} PUT`);

    try{
        let  seminarData = new SeminarEntity({
            id: req.params.seminarId as string,
			title: req.query.title as string,
			description: req.query.description as string,
			mentorId: req.query.mentorId as string,
			type: req.query.type as string,
			contentId: req.query.contentId as string,		//Content
			subjectId: req.query.subjectId as string,			//Subject
			userId: req.query.userId as string,		
        });
        let repo = new SeminarRepositoryPrisma();
        let updatedSeminar = await updateSeminarInteractor(repo,seminarData);
        return res.send(updatedSeminar);
    }
    catch(err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
     }
}
