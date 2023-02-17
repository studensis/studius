import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function getAssignmentInteractor(
	assignmentRepository: AssignmentRepository,
	id: string
) {
	let assignments = await assignmentRepository.getById(id);
	return assignments;
}
