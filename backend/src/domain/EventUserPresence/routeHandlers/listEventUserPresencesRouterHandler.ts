import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listEventUserPresencesInteractor from '../interactors/listEventUserPresencesInteractor';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

export default async function listEventUserPresencesRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/eventUserPresences GET');

	try {
		let repo = new EventUserPresenceRepositoryPrisma();
		let eventUserPresences = await listEventUserPresencesInteractor(repo);
		return res.send(eventUserPresences);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
