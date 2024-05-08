// import   prisma  from '../db'
import { Handler } from 'express'
import { getTaxis } from '../services/db_taxis'

//Handler: Indica que getAllTaxis es un manejador de solicitudes HTTP
export const getAllTaxis: Handler = async (req, res) => {
    try {
        //Si parseInt(..) devuelve NaN asignar 0
        const skip : number = parseInt(req.query.skip as string);
        const take : number = parseInt(req.query.take as string);
        if (!skip || !take) {
          return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
        }
        const taxis = await getTaxis(Number(skip), Number(take))
        res.status(200).json(taxis); 
      } catch (error: any) {
        return res.status(500).json({ message: "Error en el servidor"})
      }
}