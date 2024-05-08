import prisma from '../db'

export const trajectoryById = async(id: number) =>{
    const trajectory = await prisma.trajectories.findUnique({ where: { id: id } });
    return  trajectory;
}