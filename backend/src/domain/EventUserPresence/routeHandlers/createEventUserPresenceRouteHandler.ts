import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createEventUserPresenceInteractor from '../interactors/createEventUserPresenceInteractor';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';
import EventUserPresenceEntity from '../EventUserPresence';
import { RoomTimeEvent, User } from '@prisma/client';

export default async function createEventUserPresenceRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/EventUserPresences POST');

	try {
		let newEventUserPresence = new EventUserPresenceEntity({
			id: req.query.id as string,
			presenceStatus: eval((String(req.query.presenceStatus)).toLowerCase()) as boolean,
			roomTimeEventId: req.query.roomTimeEventId as string,
			userId: req.query.userId as string,
		});
		//newEventUserPresence.validate();
		let repo = new EventUserPresenceRepositoryPrisma();
		let eventUserPresence = await createEventUserPresenceInteractor(repo, newEventUserPresence);
		return res.send(eventUserPresence);
	} catch (err) {
		console.log(err)
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}