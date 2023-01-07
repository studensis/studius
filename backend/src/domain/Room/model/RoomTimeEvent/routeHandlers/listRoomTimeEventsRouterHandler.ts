import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listRoomTimeEventsInteractor from '../interactors/listRoomTimeEventsInteractor';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

export default async function listRoomTimeEventsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/roomTimeEvents GET');

	try {
		let repo = new RoomTimeEventRepositoryPrisma();
		let roomTimeEvents = await listRoomTimeEventsInteractor(repo);
		return res.send(roomTimeEvents);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
