import { PrismaClient } from '@prisma/client'
import { Handler } from 'express'
import { trajectoryById } from '../services/db_trajectories'

const prisma = new PrismaClient()