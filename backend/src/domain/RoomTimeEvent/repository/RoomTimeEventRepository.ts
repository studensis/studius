import UserEntity from '../../User/UserEntity';
import RoomTimeEventEntity from '../RoomTimeEventEntity'

export abstract class RoomTimeEventRepository {
	async getAll(): Promise<RoomTimeEventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async create(roomTimeEvent: RoomTimeEventEntity): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async update(roomTimeEvent: RoomTimeEventEntity): Promise<RoomTimeEventEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(roomTimeEventId: string): Promise<RoomTimeEventEntity>{
		throw new Error('Method not implemented.');
	}
}