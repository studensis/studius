import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getRoomTimeEventInteractor from '../interactors/getRoomTimeEventInteractor';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

export default async function getRoomTimeEventRouteHandler(req: Request, res: Response) {
	console.log(`roomTimeEvents/${req.params.roomTimeEventId} GET`);

	try {
		let id = String(req.params.roomTimeEventId);
		let repo = new RoomTimeEventRepositoryPrisma();
		let roomTimeEvent = await getRoomTimeEventInteractor(repo, id);
		return res.send(roomTimeEvent);
	} catch {
		return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
