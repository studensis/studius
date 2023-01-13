import { TRPCError } from '@trpc/server';
import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import { SubjectRepository } from '../repository/SubjectRepository';

export default async function updateSubjectInteractor(
	userId: string,
	role: string,
	enrollmentRepository: EnrollmentRepository,
	subjectRepository: SubjectRepository,
	subject: updateSubjectEntity
) {
	/* BUSINESS LOGIC */

	let isEditor = await enrollmentRepository.isUserEditor(userId, subject.id);
	console.log(userId, role);
	if (!isEditor && role !== 'SUPERADMIN') {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'Not permitted to edit subject',
		});
	}
	let updatedSubject = await subjectRepository.update(subject);

	/* -------------- */

	return updatedSubject;
}
