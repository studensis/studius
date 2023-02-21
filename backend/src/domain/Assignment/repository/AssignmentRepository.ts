import { paginationType } from '../../pagination/paginationObj';
import { AssignmentEntity } from '../model/AssignmentEntity';
import { updateAssignmentEntity } from '../model/updateAssignmentEntity';

export abstract class AssignmentRepository {
	async getAll(paginationInfo: paginationType): Promise<AssignmentEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<AssignmentEntity> {
		throw new Error('Method not implemented.');
	}
	async create(assignment: AssignmentEntity): Promise<AssignmentEntity> {
		throw new Error('Method not implemented.');
	}
	async update(assignment: updateAssignmentEntity): Promise<AssignmentEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(assignmentId: string): Promise<AssignmentEntity> {
		throw new Error('Method not implemented.');
	}
	async approveAssignment(id: string): Promise<AssignmentEntity> {
		throw new Error('Method not implemented.');
	}
}
