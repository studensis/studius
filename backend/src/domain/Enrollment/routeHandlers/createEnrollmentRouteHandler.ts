import { Status, SubjectRole } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EnrollmentEntity from "../EnrollmentEntity";
import createEnrollmentInteractor from "../interactors/createEnrollmentInteractor";
import EnrollmentRepositoryPrisma from "../repository/EnrollmentRepositoryPrisma";

export default async function createEnrollmentRouteHandler(
    req: Request,
    res: Response
) {
    console.log('/enrollments POST');

    try {
        let newEnrollment = new EnrollmentEntity({
            userId: req.query.userId as string, 
            subjectId: req.query.subjectId as string, 
            enrollmentDate: undefined,
            roleTitle: req.query.roleTitle as SubjectRole,
            status: req.query.status as Status
        })

        let repo = new EnrollmentRepositoryPrisma();

        let response = await createEnrollmentInteractor(repo, newEnrollment);

        res.send(response)
    }
    catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
}