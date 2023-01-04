import { SubjectRepository } from "../repository/SubjectRepository";

export default async function listEnrolledUsersInteractor(
    subjectRepository: SubjectRepository,
    subjectId: string
) {
    let users = await subjectRepository.getEnrolledUsers(subjectId);
    return users;
}