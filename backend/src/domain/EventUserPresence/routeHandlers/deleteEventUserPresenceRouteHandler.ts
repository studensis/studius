import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import deleteEventUserPresenceInteractor from '../interactors/deleteEventUserPresenceInteractor';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

export default async function deleteEventUserPresenceRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`eventUserPresences/${req.params.eventUserPresenceId} DELETE`);

	try {
		let id = req.params.eventUserPresenceId;
		let repo = new EventUserPresenceRepositoryPrisma();
		let response = await deleteEventUserPresenceInteractor(id, repo);
		return res.send(response);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
