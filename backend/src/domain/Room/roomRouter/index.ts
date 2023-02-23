import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import createRoomInteractor from '../interactors/createRoomInteractor';
import deleteRoomInteractor from '../interactors/deleteRoomInteractor';
import deleteScheduleByRoomIdInteractor from '../interactors/deleteScheduleByRoomId';
import getRoomInteractor from '../interactors/getRoomInteractor';
import listPaginatedRoomsInteractor from '../interactors/listPaginatedRoomsInteractor';
import listRoomsInteractor from '../interactors/listRoomsInteractor';
import updateRoomInteractor from '../interactors/updateRoomInteractor';
import { RoomEntity } from '../model/RoomEntity';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';

let repo = new RoomRepositoryPrisma();
let ScheduleRepo = new ScheduleRepositoryPrisma();

export default t.router({
	createRoom: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				capacity: z.number(),
				title: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let room: RoomEntity = {
				...input,
				id: '',
			};
			let newRoom = await createRoomInteractor(repo, room);
			return newRoom;
		}),

	deleteRoomById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await deleteScheduleByRoomIdInteractor(input, ScheduleRepo);
			let a = await deleteRoomInteractor(input, repo);
			return a;
		}),

	getRoomById: t.procedure.input(z.string()).query(async ({ input }) => {
		let room = await getRoomInteractor(repo, input);
		return room;
	}),

	listRooms: t.procedure.query(async () => {
		let rooms = await listRoomsInteractor(repo);
		return rooms as RoomEntity[];
	}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedRoomsInteractor(repo, input);
		return response;
	}),

	updateRoomById: t.procedure
		.input(
			z.object({
				id: z.string(),
				capacity: z.number().optional(),
				title: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let room = { ...input };
			let updatedRoom = await updateRoomInteractor(repo, room);
			return updatedRoom;
		}),
});
