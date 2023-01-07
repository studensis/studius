import { LinkedEntity } from '@prisma/client';

export type EventEntity = {
	id: string;
	title: string;
	description: string;
	linkedEntity: LinkedEntity;
	linkedEntityId: string;
};
