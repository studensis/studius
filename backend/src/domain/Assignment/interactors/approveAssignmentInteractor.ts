import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function approveAssignmentInteractor(
	assignmentRepository: AssignmentRepository,
	id: string
) {
	let confirmedAssignment = await assignmentRepository.approveAssignment(id);
	return confirmedAssignment;
}
