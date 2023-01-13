import { TRPCError } from '@trpc/server';
import createEventInteractor from '../../Event/interactors/createEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import { EventRepository } from '../../Event/repository/EventRepository';
import createRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/createRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import { RoomTimeEventRepository } from '../../RoomTimeEvent/repository/RoomTimeEventRepository';
import createSeminarSuggestionInteractor from '../../SeminarSuggestion/interactors/createSeminarSuggestionInteractor';
import { SeminarSuggestionEntity } from '../../SeminarSuggestion/model/SeminarSuggestionEntity';
import { SeminarSuggestionRepository } from '../../SeminarSuggestion/repository/SeminarSuggestionRepository';
import { approvalData } from '../model/approvalData';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function approveSeminarInteractor(
	seminarRepository: SeminarRepository,
	EventRepository: EventRepository,
	RoomTimeEventRepository: RoomTimeEventRepository,
	pinnedEvenRepository: SeminarSuggestionRepository,
	data: approvalData
) {
	let existingSeminar = await seminarRepository.getById(data.seminarId);

	if (existingSeminar.status == 'CONFIRMED') {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Seminar already approved',
		});
	}
	let confirmedSeminar = await seminarRepository.approveSeminar(data.seminarId);

	let event: EventEntity = {
		id: undefined,
		title: confirmedSeminar.title,
		description: confirmedSeminar.description!,
		linkedEntity: 'SEMINAR',
		linkedEntityId: confirmedSeminar.id,
	};
	let seminarEvent = await createEventInteractor(EventRepository, event);

	let rte: RoomTimeEventEntity = {
		id: undefined,
		dateStart: data.dateStart,
		dateEnd: data.dateEnd,
		eventId: seminarEvent.id!,
		roomId: data.roomId,
		status: 'ACTIVE',
	};
	let seminarRTE = await createRoomTimeEventInteractor(
		RoomTimeEventRepository,
		rte
	);

	let pinnedEvent: SeminarSuggestionEntity = {
		id: undefined,
		subjectId: confirmedSeminar.subjectId!,
		eventId: seminarEvent.id!,
	};
	let seminarPinnedEvent = await createSeminarSuggestionInteractor(
		pinnedEvenRepository,
		pinnedEvent
	);

	return confirmedSeminar;
}
