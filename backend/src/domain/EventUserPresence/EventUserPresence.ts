import { EventUserPresence, RoomTimeEvent, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class eventUserPresenceEntity {
	id: string;
	presenceStatus: boolean;
	roomTimeEventId: string;
	userId: string;


	constructor(props: EventUserPresence) {
		this.id = props.id;
		this.presenceStatus = props.presenceStatus;
		this.roomTimeEventId = props.roomTimeEventId;
		this.userId = props.userId;
	}
}