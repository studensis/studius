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
    console.log('/subjects/subjectId/update');

    try{
        let  subjectData = new SubjectEntity({
            id: undefined,
			title: req.params.subjectTitle,
			description: req.query.description as string,
			ectsBod: req.query.ectsBod as string,
			semester: req.query.semester as Semester,
			status: req.query.status as Status,
			contentId: undefined
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
