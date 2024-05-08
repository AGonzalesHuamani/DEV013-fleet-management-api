import prisma from '../db'

export const allTrajectories = async (skip: number, take: number) : Promise<any> => {
    const trajectories = await prisma.trajectories.findMany({
        skip: skip,
        take: take,
    });
    return trajectories;
}

export const trajectoryById = async(id: number) =>{
    const trajectory = await prisma.trajectories.findUnique({ where: { id: id } });
    return  trajectory;
}
