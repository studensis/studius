import { SubjectRepository } from '../repository/SubjectRepository';

export default async function deleteSubjectInteractor(
    email: string, 
    subjectRepository: SubjectRepository
) {
    let response = await subjectRepository.delete(email);
    return response;
}