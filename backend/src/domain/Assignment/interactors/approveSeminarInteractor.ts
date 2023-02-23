import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import { PinnedScheduleEntity } from '../../PinnedSchedule/model/PinnedScheduleEntity';
import PinnedScheduleRepositoryPrisma from '../../PinnedSchedule/repository/PinnedScheduleRepositoryPrisma';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import { approvalData } from '../model/approvalData';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function approveSeminarInteractor(
	assignmentRepository: AssignmentRepository,
	data: approvalData
) {
	let eventRepo = new EventRepositoryPrisma();
	let scheduleRepo = new ScheduleRepositoryPrisma();
	let pinnedScheduleRepo = new PinnedScheduleRepositoryPrisma();

	let confirmedAssignment = await assignmentRepository.approveAssignment(
		data.assignmentId
	);

	let event: EventEntity = {
		id: confirmedAssignment.id,
		title: confirmedAssignment.title,
		description: confirmedAssignment.description!,
		linkedEntity: 'ASSIGNMENT',
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

	let pinnedSchedule: PinnedScheduleEntity = {
		id: '',
		subjectId: confirmedAssignment.subjectId!,
		scheduleId: assignmentSchedule.id!,
	};
	let assignmentPinnedSchedule = await pinnedScheduleRepo.create(
		pinnedSchedule
	);

	return confirmedAssignment;
}
