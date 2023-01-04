import { PrismaClient } from "@prisma/client";
import { key } from "../../User/compositeKey";
import EnrollmentEntity from "../EnrollmentEntity";
import{ EnrollmentRepository } from "./EnrollmentRepository";

const prisma = new PrismaClient;

export default class EnrollmentRepositoryPrisma extends EnrollmentRepository{
    
    async create(data) { 
        
        let enrollment = await prisma.enrollment.create({
            data: {
                userId: data.userId,
                subjectId: data.subjectId,
                enrollmentDate: undefined,
                roleTitle: data.roleTitle,
                status: data.status
            },
        })
        let rez = new EnrollmentEntity(enrollment);
        return rez;
    }

    async update(data) {

        let updatedData = await prisma.enrollment.update({
            where: {
                userId_subjectId:{
                    userId: data.userId,
                    subjectId: data.subjectId
                } 
            },
            data: {
                roleTitle: data.roleTitle,
                status: data.status                
            }
        })

        let rez = new EnrollmentEntity(updatedData);
        return rez; 
    }

    async delete(enrollmentId: key) {
        
        let deleted = await prisma.enrollment.delete({
            where:{
                userId_subjectId:{
                    userId: enrollmentId.userId,
                    subjectId: enrollmentId.subjectId
                } 
            },
        })

        let rez = new EnrollmentEntity(deleted);
        return rez; 
    }

    async getAll(){

        let enrollments = await prisma.enrollment.findMany();

        let result: EnrollmentEntity[] = [];
        enrollments.forEach((e) => {
            let enrollment = new EnrollmentEntity(e);
            result.push(enrollment);
        })

        return result;
    }

    async getByUserId(userId: string) {
        let rez = await prisma.enrollment.findMany({
            where: {
                userId: userId
            }
        })
        let result: EnrollmentEntity[] = [];
        rez.forEach((e) => {
            let enrollment = new EnrollmentEntity(e);
            result.push(enrollment);
        })

        return result;
        
    }

    async getBySubjectId(subjectId: string) {
        let rez = await prisma.enrollment.findMany({
            where: {
                subjectId: subjectId
            }
        })
        let result: EnrollmentEntity[] = [];
        rez.forEach((e) => {
            let enrollment = new EnrollmentEntity(e);
            result.push(enrollment);
        })

        return result;
        
    }





}