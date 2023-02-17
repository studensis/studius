import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function listUserAssignments(
	assignmentRepository: AssignmentRepository,
	input: {
		id: string;
		options: { isMentor: boolean; isStudent: boolean };
	}
) {
	if (input.options.isMentor) {
		let assignments = await (
			await assignmentRepository.getAll()
		).filter((assignment) => assignment.mentorId == input.id);
		return assignments;
	}
	if (input.options.isStudent) {
		let assignments = await (
			await assignmentRepository.getAll()
		).filter((assignment) => assignment.userId == input.id);
		return assignments;
	}

	// let assignments = await assignmentRepository.getById(input.id);
	// return assignments;
}
