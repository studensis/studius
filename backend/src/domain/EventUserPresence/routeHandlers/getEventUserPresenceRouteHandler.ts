import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getEventUserPresenceInteractor from '../interactors/getEventUserPresenceInteractor';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

export default async function getEventUserPresenceRouteHandler(req: Request, res: Response) {
	console.log(`eventUserPresences/${req.params.eventUserPresenceId} GET`);

	try {
		let id = String(req.params.eventUserPresenceId);
		let repo = new EventUserPresenceRepositoryPrisma();
		let eventUserPresence = await getEventUserPresenceInteractor(repo, id);
		return res.send(eventUserPresence);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
