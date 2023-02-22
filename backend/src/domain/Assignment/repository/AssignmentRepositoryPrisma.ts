import { PrismaClient } from '@prisma/client';
import { AssignmentEntity } from '../model/AssignmentEntity';
import { updateAssignmentEntity } from '../model/updateAssignmentEntity';
import { AssignmentRepository } from './AssignmentRepository';

const prisma = new PrismaClient();

export default class AssignmentRepositoryPrisma extends AssignmentRepository {
	async getAll() {
		// prisma Assignments
		let datas = await prisma.assignment.findMany();

		// map to AssignmentEntities
		let assignments: AssignmentEntity[] = [];
		datas.forEach((data) => {
			let assignment: AssignmentEntity = data;
			assignments.push(assignment);
		});

		return assignments;
	}

	async getById(id: string) {
		let data = await prisma.assignment.findUnique({ where: { id: id } });
		if (data) {
			let assignment: AssignmentEntity = data;
			return assignment;
		} else {
			throw new Error('no data');
		}
	}

	async update(assignmentData: updateAssignmentEntity) {
		let updatedAssignment: any = {};

		if (assignmentData.title) updatedAssignment['title'] = assignmentData.title;
		if (assignmentData.description)
			updatedAssignment['description'] = assignmentData.description;
		if (assignmentData.mentorId)
			updatedAssignment['mentorId'] = assignmentData.mentorId;
		if (assignmentData.contentId)
			updatedAssignment['contentId'] = assignmentData.contentId;
		if (assignmentData.subjectId)
			updatedAssignment['subjectId'] = assignmentData.subjectId;
		if (assignmentData.userId)
			updatedAssignment['userId'] = assignmentData.userId;
		if (assignmentData.status)
			updatedAssignment['assignmentStatus'] = assignmentData.assignmentStatus;
		if (assignmentData.status)
			updatedAssignment['status'] = assignmentData.status;
		if (assignmentData.type) updatedAssignment['type'] = assignmentData.type;
		if (assignmentData.deadline)
			updatedAssignment['deadline'] = assignmentData.deadline;
		let updatedData = await prisma.assignment.update({
			where: {
				id: assignmentData.id,
			},
			data: {
				title: updatedAssignment.title,
				description: updatedAssignment.description,
				mentorId: updatedAssignment.mentorId,
				contentId: updatedAssignment.contentId,
				subjectId: updatedAssignment.subjectId,
				userId: updatedAssignment.userId,
				assignmentStatus: updatedAssignment.assignmentStatus,
				status: updatedAssignment.status,
				type: updatedAssignment.type,
				deadline: updatedAssignment.deadline,
			},
		});
		let rez: AssignmentEntity = updatedData;

		return rez;
	}

	async create(assignment: AssignmentEntity) {
		let response = await prisma.assignment.create({
			data: {
				id: undefined,
				title: assignment.title,
				description: assignment.description,
				mentorId: assignment.mentorId,
				contentId: assignment.contentId,
				subjectId: assignment.subjectId,
				userId: assignment.userId,
				type: assignment.type,
				status: assignment.status,
				deadline: assignment.deadline,
			},
		});

		console.log(response);

		let out: AssignmentEntity = response;
		return out;
	}

	async delete(assignmentId: string) {
		let response = await prisma.assignment.delete({
			where: {
				id: assignmentId,
			},
		});
		let rez: AssignmentEntity = response;
		return rez;
	}

	async approveAssignment(id: string) {
		let change = await prisma.assignment.update({
			where: {
				id: id,
			},
			data: {
				assignmentStatus: 'CONFIRMED',
			},
		});

		let rez: AssignmentEntity = change;
		return rez;
	}
}
