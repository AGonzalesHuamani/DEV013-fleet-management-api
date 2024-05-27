import prisma from '../db'

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

