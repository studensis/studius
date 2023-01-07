import { TRPCError } from '@trpc/server';
import { SubjectRepository } from '../repository/SubjectRepository';
import { updateSubjectEntity } from '../updateSubjectEntity';

export default async function updateSubjectInteractor(
	userId: string,
	subjectRepository: SubjectRepository,
	subject: updateSubjectEntity
) {
	let isEditor = await subjectRepository.isUserEditor(userId, subject.id);
	if (!isEditor) {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'Not permitted to edit subject',
		});
	}
	let updatedSubject = await subjectRepository.update(subject);
	return updatedSubject;
}
