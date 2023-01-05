import { LinkedEntity } from '@prisma/client';

export type updateContentEntity = {
	id: string;
	markdownText?: string;
	plainText?: string;
	date?: Date | null; // Date
	linkedEntity?: LinkedEntity;
	linkedEntityId?: string;
};
