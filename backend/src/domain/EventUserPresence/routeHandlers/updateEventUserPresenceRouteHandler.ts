// import { Semester, Status } from '@prisma/client';
// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import updateEventUserPresenceInteractor from '../interactors/updateEventUserPresenceInteractor';
// import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';
// import EventUserPresenceEntity from '../EventUserPresence';


// export default async function updateEventUserPresenceRouteHandler(
//     req: Request,
//     res: Response
// ) {
//     console.log(`eventUserPresences/${req.params.eventUserPresenceId} PUT`);

//     try{
//         let  eventUserPresenceData = new EventUserPresenceEntity({
//             id: req.query.id as string,
// 			presenceStatus: eval((String(req.query.presenceStatus)).toLowerCase()) as boolean,
// 			roomTimeEventId: req.query.roomTimeEventId as string,
// 			userId: req.query.userId as string,
//         });
//         let repo = new EventUserPresenceRepositoryPrisma();
//         let updatedEventUserPresence = await updateEventUserPresenceInteractor(repo,eventUserPresenceData);
//         return res.send(updatedEventUserPresence);
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
//      }
// }
