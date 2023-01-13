import { updateSeminarEntity } from '../model/updateSeminarEntity';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function updateSeminarInteractor(
	seminarRepository: SeminarRepository,
	seminar: updateSeminarEntity
) {
	let updatedSeminar = await seminarRepository.update(seminar);
	return updatedSeminar;
}
