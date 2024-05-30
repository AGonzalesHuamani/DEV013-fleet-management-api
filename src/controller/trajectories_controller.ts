// import   prisma  from '../db'
import { Handler } from 'express'
import { locationHistory, allTrajectories, lastLocation } from '../services/db_trajectories'


const getAllTrajectories: Handler = async (req, res) => {
        try {
            const skip : number = parseInt(req.query.skip as string)||0;
            const take : number = parseInt(req.query.take as string)||10;
            
            // if (skip<0 || take<0) {
            // return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            // }
            const startIndex = (skip - 1) * take;
            if (!skip || !take) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
                }

            const trajectories = await allTrajectories(Number(startIndex),Number(take))
            return res.status(200).json(trajectories);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    }


const getLocationHistory: Handler = async (req,res) => {
        try {
            
            const { date } = req.query;
            const {id} = req.params;
            const endDate = new Date(date as string);
            
            if (!id || !date) {
                return res.status(400).json({ message: 'los parametros taxiId y date son obligatorios en la consulta' })
              }

            const skip : number = parseInt(req.query.skip as string)||1; //Página por defecto 1
            const take : number = parseInt(req.query.take as string)||10; // Límite por defecto 10
            const startIndex = (skip - 1) * take;
                        
            endDate.setDate(endDate.getDate() + 1);

            const trajectories = await locationHistory(parseInt(id), new Date(date as string), startIndex, Number(take));
            // console.log("trajectories", trajectories);
                
            if (!trajectories){
                return res.status(404).json({message: 'No se encontró ninguna trayectoria con el id proporcionado' });
            }
            return res.status(200).json(trajectories)
        } catch (error:any) {
            return res.status(500).json({message: 'Error en el servidor '})
            
        }
    }

const getLastLocation: Handler = async (req, res) => {
        try {
            const { skip, take } = req.query;
    
            if (!skip || !take) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            }
    
            const skipNum = parseInt(skip as string, 10);
            const takeNum = parseInt(take as string, 10);
    
            if (isNaN(skipNum) || isNaN(takeNum) || skipNum < 0 || takeNum < 0) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' tienen que ser un número y ademas positivo." });
            }
    
            // console.log("skip", skipNum);
            // console.log("take", takeNum);
    
            const location = await lastLocation(skipNum, takeNum);
            return res.status(200).json(location);
            } catch (error: any) {
                return res.status(500).json({ message: error.message });
            }
    }

export { getAllTrajectories, getLocationHistory, getLastLocation}


