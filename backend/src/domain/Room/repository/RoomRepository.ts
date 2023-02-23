import { RoomEntity } from '../model/RoomEntity';
import { updateRoomEntity } from '../model/updateRoomEntity';

export abstract class RoomRepository {
	async getAll(): Promise<RoomEntity[]> {
		throw new Error('Method not implemented.');
	}
	async listPaginated(paginationInfo: paginationType): Promise<RoomEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<RoomEntity> {
		throw new Error('Method not implemented.');
	}
	async create(Room: RoomEntity): Promise<RoomEntity> {
		throw new Error('Method not implemented.');
	}
	async update(room: updateRoomEntity): Promise<RoomEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(roomId: string): Promise<RoomEntity> {
		throw new Error('Method not implemented.');
	}
}
