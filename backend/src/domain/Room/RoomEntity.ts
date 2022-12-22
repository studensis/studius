import { Room, User } from '@prisma/client';
import { Subject } from '@prisma/client';
import internal from 'stream';

export default class RoomEntity {
	id: string;
	capacity: number;		// User


	constructor(props: Room) {
		this.id = props.id;
		this.capacity = props.capacity;
	}
}