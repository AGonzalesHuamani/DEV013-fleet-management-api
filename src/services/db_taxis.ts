import prisma from '../db'

export const getTaxis = async ( skip: number, take: number ) => {
    const findAll = await prisma.taxis.findMany({
        skip: skip,
        take: take
    });
    return findAll;
}

