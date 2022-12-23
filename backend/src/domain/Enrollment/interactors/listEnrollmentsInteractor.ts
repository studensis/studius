import { EnrollmentRepository } from "../repository/EnrollmentRepository";

export default async function listEnrollmentsInteractor(
    enrollmetsRepository: EnrollmentRepository
) { 
    let rez = await enrollmetsRepository.getAll();
    return rez; 
}