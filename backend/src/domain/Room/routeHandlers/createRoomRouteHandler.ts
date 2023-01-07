import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createRoomInteractor from '../interactors/createRoomInteractor';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';
import RoomEntity from '../RoomEntity';

export default async function createRoomRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/rooms POST');

	try {
		let newRoom: RoomEntity = {
			id: req.query.id as string,
			title: req.query.title as string,
			capacity: parseInt(String(req.query.capacity)),
		};
		//newRoom.validate();
		let repo = new RoomRepositoryPrisma();
		let room = await createRoomInteractor(repo, newRoom);
		return res.send(room);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
