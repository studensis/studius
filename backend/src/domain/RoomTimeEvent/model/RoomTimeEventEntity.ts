import { Status } from '@prisma/client';

export type RoomTimeEventEntity = {
	id?: string;
	dateStart: Date;
	dateEnd: Date;
	eventId: string;
	roomId: string;
	status: Status;
};
