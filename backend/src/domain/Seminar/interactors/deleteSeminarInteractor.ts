import { SeminarRepository } from '../repository/SeminarRepository';

export default async function deleteSeminarInteractor(
    id: string, 
    seminarRepository: SeminarRepository
) {
    let response = await seminarRepository.delete(id);
    return response;
}