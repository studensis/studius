import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listRoomsInteractor from '../interactors/listRoomInteractor';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';

export default async function listRoomsRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`rooms/${req.params.roomId} GET`);

	try {
		let repo = new RoomRepositoryPrisma();
		let rooms = await listRoomsInteractor(repo);
		return res.send(rooms);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
