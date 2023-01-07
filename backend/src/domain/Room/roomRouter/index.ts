import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createRoomInteractor from '../interactors/createRoomInteractor';
import deleteRoomInteractor from '../interactors/deleteRoomInteractor';
import getRoomInteractor from '../interactors/getRoomInteractor';
import listRoomsInteractor from '../interactors/listRoomsInteractor';
import updateRoomInteractor from '../interactors/updateRoomInteractor';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';
import { RoomEntity } from '../RoomEntity';

let repo = new RoomRepositoryPrisma();

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
