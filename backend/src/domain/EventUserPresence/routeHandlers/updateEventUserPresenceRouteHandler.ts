import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import EventUserPresenceEntity from '../EventUserPresenceEntity';
import updateEventUserPresenceInteractor from '../interactors/updateEventUserPresenceInteractor';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

export default async function updateEventUserPresenceRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`eventUserPresences/${req.params.eventUserPresenceId} PUT`);

	try {
		let eventUserPresenceData = new EventUserPresenceEntity({
			id: req.params.eventUserPresenceId as string,
			presenceStatus: eval(
				String(req.query.presenceStatus).toLowerCase()
			) as boolean,
			roomTimeEventId: undefined,
			userId: undefined,
		});
		let repo = new EventUserPresenceRepositoryPrisma();
		let updatedEventUserPresence = await updateEventUserPresenceInteractor(
			repo,
			eventUserPresenceData
		);
		return res.send(updatedEventUserPresence);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}