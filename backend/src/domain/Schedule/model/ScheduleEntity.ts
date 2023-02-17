import { Status } from '@prisma/client';

export type ScheduleEntity = {
	id: string;
	dateStart: Date;
	dateEnd: Date;
	eventId: string;
	roomId: string;
	status: Status;
};
