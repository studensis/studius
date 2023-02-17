import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import { PinnedEventEntity } from '../../PinnedEvent/model/PinnedEventEntity';
import PinnedEventRepositoryPrisma from '../../PinnedEvent/repository/PinnedEventRepositoryPrisma';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import { approvalData } from '../model/approvalData';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function approveAssignmentInteractor(
	assignmentRepository: AssignmentRepository,
	data: approvalData
) {
	let eventRepo = new EventRepositoryPrisma();
	let scheduleRepo = new ScheduleRepositoryPrisma();
	let pinnedEventRepo = new PinnedEventRepositoryPrisma();

	let confirmedAssignment = await assignmentRepository.approveAssignment(
		data.assignmentId
	);

	let event: EventEntity = {
		id: confirmedAssignment.id,
		title: confirmedAssignment.title,
		description: confirmedAssignment.description!,
		linkedEntity: 'SEMINAR',
		linkedEntityId: confirmedAssignment.id,
	};
	let assignmentEvent = await eventRepo.create(event);

	let schedule: ScheduleEntity = {
		id: '',
		dateStart: data.dateStart,
		dateEnd: data.dateEnd,
		eventId: assignmentEvent.id!,
		roomId: data.roomId,
		status: 'ACTIVE',
	};
	let assignmentSchedule = await scheduleRepo.create(schedule);

	let pinnedEvent: PinnedEventEntity = {
		id: '',
		subjectId: confirmedAssignment.subjectId!,
		eventId: assignmentEvent.id!,
	};
	let assignmentPinnedEvent = pinnedEventRepo.create(pinnedEvent);

	return confirmedAssignment;
}
