import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createRoomTimeEventInteractor from '../interactors/createRoomTimeEventInteractor';
import RoomTimeEventEntity from '../model/RoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

export default async function createRoomTimeEventRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/RoomTimeEvents POST');

	try {
		let newRoomTimeEvent = new RoomTimeEventEntity({
			id: req.query.id as string,
			dateStart: new Date(
				Date.parse(String(req.query.dateStart))
			) as Date,
			dateEnd: new Date(Date.parse(String(req.query.dateEnd))) as Date,
			roomId: req.query.roomId as string,
			eventId: req.query.eventId as string,
		});
		//newRoomTimeEvent.validate();
		let repo = new RoomTimeEventRepositoryPrisma();
		let roomTimeEvent = await createRoomTimeEventInteractor(
			repo,
			newRoomTimeEvent
		);
		return res.send(roomTimeEvent);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
