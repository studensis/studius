import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateRoomTimeEventInteractor from '../interactors/updateRoomTimeEventInteractor';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';
import RoomTimeEventEntity from '../RoomTimeEventEntity';


export default async function updateRoomTimeEventRouteHandler(
    req: Request,
    res: Response
) {
    console.log(`roomTimeEvents/${req.params.roomTimeEventId} PUT`);

    try{
        let  roomTimeEventData = new RoomTimeEventEntity({
            id: req.params.roomTimeEventId as string,
			dateStart: new Date(Date.now()) as Date,		// placeholder
			dateEnd: new Date(Date.now()) as Date,			// placeholder
			roomId: req.query.roomId as string,
			eventId: req.query.eventId as string,
        });
        let repo = new RoomTimeEventRepositoryPrisma();
        let updatedRoomTimeEvent = await updateRoomTimeEventInteractor(repo,roomTimeEventData);
        return res.send(updatedRoomTimeEvent);
    }
    catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
