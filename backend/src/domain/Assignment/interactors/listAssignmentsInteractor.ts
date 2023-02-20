import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function listAssignmentsInteractor(
	assignmentRepository: AssignmentRepository
) {
	let assignments = await assignmentRepository.getAll();
	return assignments;
}
