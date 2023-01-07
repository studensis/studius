import { LinkedEntity } from '@prisma/client';

export type updateEventEntity = {
	id: string;
	title?: string;
	description?: string;
	linkedEntity?: LinkedEntity;
	linkedEntityId?: string;
};
