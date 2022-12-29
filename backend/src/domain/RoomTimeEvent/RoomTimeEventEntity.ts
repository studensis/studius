import { EventUserPresence, RoomTimeEvent, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class RoomTimeEventEntity {
	id: string;
	dateStart: Date;
	dateEnd: Date;
	eventId: string;
	roomId: string;


	constructor(props: RoomTimeEvent) {
		this.id = props.id;
		this.dateStart = props.dateStart;
		this.dateEnd = props.dateEnd;
		this.eventId = props.eventId;
		this.roomId = props.roomId;	

	}
}