import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listEventsInteractor from '../interactors/listEventsInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

export default async function listEventsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/events GET');

	try {
		let repo = new EventRepositoryPrisma();
		let events = await listEventsInteractor(repo);
		return res.send(events);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
