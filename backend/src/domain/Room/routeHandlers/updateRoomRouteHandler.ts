import { Semester, Status } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateRoomInteractor from '../interactors/updateRoomInteractor';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';
import RoomEntity from '../RoomEntity';


export default async function updateRoomRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`rooms/${req.params.roomId} PUT`);

    try{
        let  roomData = new RoomEntity({
            id: req.params.roomId as string,
			capacity: parseInt(String(req.query.capacity)) as number,
        });
        let repo = new RoomRepositoryPrisma();
        let updatedRoom = await updateRoomInteractor(repo,roomData);
        return res.send(updatedRoom);
    }
    catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
