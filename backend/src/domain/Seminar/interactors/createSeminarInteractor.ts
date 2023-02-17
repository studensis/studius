import { TRPCError } from '@trpc/server';
import { SeminarEntity } from '../model/SeminarEntity';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function createSeminarInteractor(
	seminarRepository: SeminarRepository,
	seminar: SeminarEntity
) {
	if (
		!seminar.title ||
		!seminar.description ||
		!seminar.mentorId ||
		!seminar.userId ||
		!seminar.subjectId
	) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Nepotpuni podaci',
		});
	}
	let seminars = await seminarRepository.create(seminar);
	return seminars;
}
