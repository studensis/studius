import { Room } from '@prisma/client';

export default class RoomEntity {
	id: string;
	capacity: number; // User
	title: string;

	constructor(props: Room) {
		this.id = props.id;
		this.capacity = props.capacity;
		this.title = props.title;
	}
}
