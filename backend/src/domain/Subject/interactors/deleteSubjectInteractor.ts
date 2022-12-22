import { SubjectRepository } from '../repository/SubjectRepository';

export default async function deleteSubjectInteractor(
    id: string, 
    subjectRepository: SubjectRepository
) {
    let response = await subjectRepository.delete(id);
    return response;
}