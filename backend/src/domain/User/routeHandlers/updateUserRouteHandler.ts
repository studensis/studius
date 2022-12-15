import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listUsersInteractor from '../interactors/listUsersInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';

