import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateUserInteractor from '../interactors/updateUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';
import UserEntity from '../UserEntity';
import { UserRole } from '../UserRole';


export default async function updateUserRouteHandler(
    req: Request,
    res: Response
) {
    console.log('/users/userId/update');

    try{
        let  userData = new UserEntity({
            id : undefined,
			firstname : req.query.firstname as string,
			lastname : req.query.lastname as string,
			password: req.query.password as string,
			jmbag: req.query.jmbag as string,
			email: req.query.email as string, 
			userRole: req.query.userRole as UserRole,
            mentorID: undefined, 
        });
        //potrebno staviti validaciju novih podataka 
        let repo = new UserRepositoryPrisma();
        let updatedUser = await updateUserInteractor(repo,userData);
        return res.send(updatedUser);
    }
    catch(err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
     }
}

