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
		res.send(rooms);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
