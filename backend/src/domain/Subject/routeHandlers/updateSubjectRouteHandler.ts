import { Semester, Status } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';
import SubjectEntity from '../SubjectEntity';


export default async function updateSubjectRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`subjects/${req.params.subjectId} PUT`);

    try{
        let  subjectData = new SubjectEntity({
            id: req.params.subjectId as string,
			title: req.query.title as string,
			description: req.query.description as string,
			ectsBod: req.query.ectsBod as string,
			semester: req.query.semester as Semester,
			status: req.query.status as Status,
			contentId: String(req.query.contentId).split(",") as string[],        
        });
        let repo = new SubjectRepositoryPrisma();
        let updatedSubject = await updateSubjectInteractor(repo,subjectData);
        return res.send(updatedSubject);
    }
    catch(err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
     }
}
