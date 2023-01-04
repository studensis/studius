import { LinkedEntity } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import EventEntity from '../EventEntity';
import updateEventInteractor from '../interactors/updateEventInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

export default async function updateEventRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`events/${req.params.eventId} PUT`);

	try {
		let eventData = new EventEntity({
			id: req.params.eventId as string,
			title: req.query.title as string,
			description: req.query.description as string,
			linkedEntity: String(
				req.query.linkedEntity
			).toUpperCase() as LinkedEntity,
			linkedEntityId: req.query.linkedEntityId as string,
		});
		let repo = new EventRepositoryPrisma();
		let updatedEvent = await updateEventInteractor(repo, eventData);
		return res.send(updatedEvent);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
