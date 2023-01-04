import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getEventInteractor from '../interactors/getEventInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

export default async function getEventRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`events/${req.params.eventId} GET`);

	try {
		let id = String(req.params.eventId);
		let repo = new EventRepositoryPrisma();
		let event = await getEventInteractor(repo, id);
		return res.send(event);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
