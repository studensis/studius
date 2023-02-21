import { paginationType } from '../../pagination/paginationObj';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function listUserAssignmentsInteractor(
	assignmentRepository: AssignmentRepository,
	input: {
		pageNumber: number;
		objectsPerPage: number;
		options: {
			isMentor: boolean;
			isStudent: boolean;
		};
		id: string;
	}
) {
	let paginationInfo: paginationType = {
		pageNumber: input.pageNumber,
		objectsPerPage: input.objectsPerPage,
	};
	if (input.options.isMentor) {
		let assignments = await (
			await assignmentRepository.getAll(paginationInfo)
		).filter((assignment) => assignment.mentorId == input.id);
		return assignments;
	}
	if (input.options.isStudent) {
		let assignments = await (
			await assignmentRepository.getAll(paginationInfo)
		).filter((assignment) => assignment.userId == input.id);
		return assignments;
	}

	// let assignments = await assignmentRepository.getById(input.id);
	// return assignments;
}
