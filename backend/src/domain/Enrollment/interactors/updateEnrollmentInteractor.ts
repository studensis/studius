import { Status, SubjectRole } from "@prisma/client";
import { Request, Response } from "express";
import EnrollmentEntity from "../EnrollmentEntity";
import { EnrollmentRepository } from "../repository/EnrollmentRepository";
import EnrollmentRepositoryPrisma from "../repository/EnrollmentRepositoryPrisma";

export default async function updateEnrollmentInteractor(
    enrollmentRepository: EnrollmentRepository, 
    data: EnrollmentEntity
) {
    let response = await enrollmentRepository.update(data);
    return response;
}