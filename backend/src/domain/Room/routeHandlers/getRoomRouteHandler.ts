import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getRoomInteractor from '../interactors/getRoomInteractor';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';

export default async function getRoomRouteHandler(req: Request, res: Response) {
	console.log('/Rooms/:roomId GET');

	try {
		let id = String(req.params.roomId);
		let repo = new RoomRepositoryPrisma();
		let room = await getRoomInteractor(repo, id);
		return res.send(room);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
