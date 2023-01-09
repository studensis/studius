import { LinkedEntity } from '@prisma/client';

export type updatePostEntity = {
	id: string;
	title?: string;
	date?: Date | null; // Date
	ownerId?: string;
	linkedEntity?: LinkedEntity; // LinkedEntity
	linkedEntityId?: string;
	contentId?: string;
};
