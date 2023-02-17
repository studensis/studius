import { updateAssignmentEntity } from '../model/updateAssignmentEntity';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function updateAssignmentInteractor(
	assignmentRepository: AssignmentRepository,
	assignment: updateAssignmentEntity
) {
	let updatedAssignment = await assignmentRepository.update(assignment);
	return updatedAssignment;
}
