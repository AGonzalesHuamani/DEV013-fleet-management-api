// import   prisma  from '../db'
import { Handler } from 'express'
import { locationHistory, allTrajectories } from '../services/db_trajectories'


const getAllTrajectories: Handler = async (req, res) => {
        try {
            const skip : number = parseInt(req.query.skip as string)??0;
            const take : number = parseInt(req.query.take as string)??10;
            if (!skip || !take) {
            return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            }
            const trajectories = await allTrajectories(Number(skip),Number(take))
            return res.status(200).json(trajectories);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    }

        //cambiarnombre
        const getLocationHistory: Handler = async (req,res) => {
        try {
            const { date } = req.query;
            const {id} = req.params;
            const endDate = new Date(date as string);
            // considerar la paginacion con valores por defecto... 
            // condicional 
            console.log("este es el id", id);
            console.log("este el date", date);
            
            
            endDate.setDate(endDate.getDate() + 1);
            const trajectories = await locationHistory(parseInt(id), new Date(date as string));
            console.log("estas son las trayectorias",trajectories);
            
            if (!trajectories){
                return res.status(404).json({message: 'no se encontró ninguna trayectoria con el id proporcionado ' });
            }
            return res.status(200).json(trajectories)
        } catch (error:any) {
            return res.status(500).json({message: 'Error en el servidor '})
            
        }
    }
    

export { getAllTrajectories, getLocationHistory}


