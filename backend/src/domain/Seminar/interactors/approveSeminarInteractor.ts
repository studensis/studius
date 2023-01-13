import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../../RoomTimeEvent/repository/RoomTimeEventRepositoryPrisma';
import { SeminarSuggestionEntity } from '../../SeminarSuggestion/model/SeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../../SeminarSuggestion/repository/SeminarSuggestionRepositoryPrisma';
import { approvalData } from '../model/approvalData';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function approveSeminarInteractor(
	seminarRepository: SeminarRepository,
	data: approvalData
) {
	let eventRepo = new EventRepositoryPrisma();
	let rteRepo = new RoomTimeEventRepositoryPrisma();
	let pinnedEventRepo = new SeminarSuggestionRepositoryPrisma();

	let confirmedSeminar = await seminarRepository.approveSeminar(data.seminarId);

	let event: EventEntity = {
		id: undefined,
		title: confirmedSeminar.title,
		description: confirmedSeminar.description!,
		linkedEntity: 'SEMINAR',
		linkedEntityId: confirmedSeminar.id,
	};
	let seminarEvent = await eventRepo.create(event);

	let rte: RoomTimeEventEntity = {
		id: undefined,
		dateStart: data.dateStart,
		dateEnd: data.dateEnd,
		eventId: seminarEvent.id!,
		roomId: data.roomId,
		status: 'ACTIVE',
	};
	let seminarRTE = await rteRepo.create(rte);

	let pinnedEvent: SeminarSuggestionEntity = {
		id: undefined,
		subjectId: confirmedSeminar.subjectId!,
		eventId: seminarEvent.id!,
	};
	let seminarPinnedEvent = pinnedEventRepo.create(pinnedEvent);

	return confirmedSeminar;
}
