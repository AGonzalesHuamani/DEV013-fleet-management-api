// import {prisma} from '../db'
import { PrismaClient } from "@prisma/client"
// import * as XLSX from 'xlsx';
// import * as nodemailer from 'nodemailer';
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})


export const allTrajectories = async (skip: number, take: number) : Promise<any> => {
    const trajectories = await prisma.trajectories.findMany({
        skip: skip,
        take: take,
    });
    return trajectories;
}

export const locationHistory = async(id: number, date: Date, skip: number, take: number) =>{
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);
    const  trajectorieHistory = await prisma.trajectories.findMany({ 
        skip: skip,
        take: take,
        where: { 
            taxi_id: id,
            date: {
                gte: date,
                lt: endDate
            },
        },

    });
    return trajectorieHistory;
};

export const lastLocation = async(skip:number, take:number) => {
    
    const lastLocation = await prisma.trajectories.findMany({
      skip: skip,
      take: take,
      orderBy: {
        date: 'desc',
      },
      select: {
        taxis: {
          select: {
            plate: true,
          }
        },
        taxi_id: true,
        latitude: true,
        longitude: true,
        date: true,
      },
      distinct: ['taxi_id'],
      
  });
  return lastLocation
};

export const getDataExport = async (id: string, searchDate: Date) => {
  try {
    return await prisma.trajectories.findMany({
      where: {
        taxi_id: parseInt(id),
        date: {
          gte: searchDate, // Fecha mayor o igual a la fecha especificada // todas las ubis que sean >= a la fecha
          lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) // Fecha menor a 24 horas después de la fecha especificada
        }
      },
      orderBy: {
        date: 'asc' // Ordenar por fecha ascendente
      },
      select: {
        latitude: true,
        longitude: true,
        taxi_id: true,
        date: true,
      }
    });


    
  } catch (error) {
    return error
  }
}