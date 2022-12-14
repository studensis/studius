import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createEventInteractor from '../interactors/createEventInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';
import EventEntity from '../EventEntity';

export default async function createEventRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/events POST');

	try {
		let newEvent = new EventEntity({
			id: undefined,
			title: req.query.title as string,
			description: req.query.description as string,
			LinkedEntity: req.query.LinkedEntity as string,
			LinkedEntityID: req.query.LinkedEntityID as string,
		});
		// newEvent.validate();
		let repo = new EventRepositoryPrisma();
		let event = await createEventInteractor(repo, newEvent);
		return res.send(event);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
