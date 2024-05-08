// import   prisma  from '../db'
import { Handler } from 'express'
import { trajectoryById, allTrajectories } from '../services/db_trajectories'

export const getAllTrajectories: Handler = async (req, res) => {
        try {
        const skip : number = parseInt(req.query.skip as string);
        const take : number = parseInt(req.query.take as string);
        if (!skip || !take) {
          return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
        }
        const trajectories = await allTrajectories(Number(skip),Number(take))
        return res.status(200).json(trajectories);
        } catch (error: any) {
        return res.status(500).json({ message: 'Error en el servidor' })
        }
    }

