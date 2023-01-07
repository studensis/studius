import SeminarEntity from '../model/SeminarEntity';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function updateSeminarInteractor(
	seminarRepository: SeminarRepository,
	seminar: SeminarEntity
) {
	let updatedSeminar = await seminarRepository.update(seminar);
	return updatedSeminar;
}
