import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createEventInteractor from '../interactors/createEventInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';
import EventEntity from '../EventEntity';
import { LinkedEntity } from '@prisma/client';

export default async function createEventRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/events POST');

	try {
		let newEvent = new EventEntity({
			id: req.query.id as string,
			title: req.query.title as string,
			description: req.query.description as string,
			linkedEntity: (String(req.query.linkedEntity)).toUpperCase() as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
		});
		// newEvent.validate();
		let repo = new EventRepositoryPrisma();
		let event = await createEventInteractor(repo, newEvent);
		return res.send(event);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
