// import   prisma  from '../db'
import { Handler } from 'express'
import { locationHistory, allTrajectories, lastLocation, getDataExport } from '../services/db_trajectories'
import * as XLSX from "xlsx"
import * as  nodemailer from "nodemailer"
import * as fs from "fs"

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


// exportar trayectorias segun id y fecha /trajectories/id/export
const getExportExcel: Handler = async (req, res) => {
    const { id } = req.params
    // obtener email 
    const { date, email } = req.query 
    // Convertir la fecha a formato de objeto Date
    const searchdate = new Date(date as string) 
    try {
      const data = await getDataExport(id, searchdate)
      // generar el archivo excel // genera una hoja de trabajo a partir de los datos
      const worksheet = XLSX.utils.json_to_sheet(data as object[]); 
      console.log("este es worksheet",worksheet);
      
      // crea un nuevo libro 
      const workbook = XLSX.utils.book_new(); 
      console.log("este es workbook",workbook);
      //Añade la hoja de trabajo al libro de trabajo
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Trayectorias');
      // Verifica si la carpeta temp existe
      if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp'); // Crea la carpeta temp si no existe
      }
      const filePath = `./temp/trajectories_${id}_${date}.xlsx`; // define la ruta del archivo excel a crear
  
      // Crear el archivo temporalmente
      XLSX.writeFile(workbook, filePath);
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
  
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL, // Remitente
        to: email as string, // Destinatario
        subject: 'Exportación de trayectorias intento 2222222221',
        text: '¡Hola! Este es un correo electrónico de prueba 2222222221', // Contenido del correo (texto plano)
        attachments: [ //adjuntar 
          {
            filename: `trajectories_${id}_${date}.xlsx`, // aqui le damos el nombre al archivo excel
            path: filePath, // aqui le pasamos el excel generado
          },
        ],
      };
  
      // Enviar el correo
      await transporter.sendMail(mailOptions);
      //console.log('Correo electrónico enviado');
  
      // // Eliminar el archivo temporal
      // fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'El archivo Excel ha sido enviado por correo electrónico' });
  
    } catch (error) {
      console.error('Error al obtener las ubicaciones del taxi', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  
  }


export { getAllTrajectories, getLocationHistory, getLastLocation, getExportExcel}


