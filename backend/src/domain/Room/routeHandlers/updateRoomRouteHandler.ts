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

	try {
		let roomData: RoomEntity = {
			id: req.params.roomId,
			title: req.params.title,
			capacity: parseInt(String(req.query.capacity)),
		};
		let repo = new RoomRepositoryPrisma();
		let updatedRoom = await updateRoomInteractor(repo, roomData);
		return res.send(updatedRoom);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
