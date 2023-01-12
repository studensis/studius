import { TRPCError } from '@trpc/server';
import { updateSeminarEntity } from '../model/updateSeminarEntity';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function updateSeminarInteractor(
	seminarRepository: SeminarRepository,
	seminar: updateSeminarEntity
) {
	let existingSeminar = await seminarRepository.getById(seminar.id);
	if (existingSeminar.status == 'CONFIRMED') {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Unable to update',
		});
	}
	let updatedSeminar = await seminarRepository.update(seminar);
	return updatedSeminar;
}
