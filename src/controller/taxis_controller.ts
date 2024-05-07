import { PrismaClient } from '@prisma/client'
import { Handler } from 'express'

const prisma = new PrismaClient()

//Handler: Indica que getAllTaxis es un manejador de solicitudes HTTP
export const getAllTaxis: Handler = async (req, res) => {
    try {
        //Si parseInt(..) devuelve NaN asignar 0
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;
        const findAll = await prisma.taxis.findMany({
          skip: skip,
          take: take
        });
        res.status(200).json(findAll); 
      } catch (error) {
        return res.status(400).json({ message: "No encontrado"})
      }
}