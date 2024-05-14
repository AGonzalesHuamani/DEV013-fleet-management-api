import prisma from '../db'

export const allTrajectories = async (skip: number, take: number) : Promise<any> => {
    const trajectories = await prisma.trajectories.findMany({
        skip: skip,
        take: take,
    });
    return trajectories;
}

export const locationHistory = async(id: number, date: Date) =>{
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);
    const  trajectorieHistory = await prisma.trajectories.findMany({ 
        where: { 
            taxi_id: id
            // date: endDate 
        },
        // considere la fecha, dia mes y año ... investigar 

    });
    return trajectorieHistory;
};
