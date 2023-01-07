import { TRPCError } from '@trpc/server';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import { SubjectRepository } from '../repository/SubjectRepository';

export default async function updateSubjectInteractor(
	userId: string,
	subjectRepository: SubjectRepository,
	subject: updateSubjectEntity
) {
	/* BUSINESS LOGIC */

	let isEditor = await subjectRepository.isUserEditor(userId, subject.id);
	if (!isEditor) {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'Not permitted to edit subject',
		});
	}
	let updatedSubject = await subjectRepository.update(subject);

	/* -------------- */

	return updatedSubject;
}
