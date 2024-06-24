// modulo file system 
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import * as path from 'path';

console.log("process", process.argv.slice(2));

//filePath: La ruta del archivo que se va a procesar.
//type: string: El tipo de datos que se están procesando 

// Leer y procesar un archivo de texto || Insertar registros en la BD
async function processFile(filePath: string, type: string, prisma: PrismaClient): Promise<void> {
    try {
        // 1ero leer el contenido del archivo como una cadena.
        const data: string = await fs.readFile(filePath, 'utf-8');

        // 2do Dividir el contenido del archivo en líneas, elimina los espacios en blanco y filtra las líneas vacías.
        const lines: string[] = data.split('\n').map((line: string) => line.trim()).filter(Boolean);

        for (const line of lines) {
            // Dividir la línea en campos separados por comas.
            const [field1, field2, field3, field4] = line.split(',');
            // console.log(" estamos en line", line);
            
            if (type === 'taxis') {
                //crear un registro en la BD utilizando Prisma.
                await prisma.taxis.create({
                    data: {
                        id: parseInt(field1),
                        plate: field2,
                    },
                });
            } else if (type === 'trajectories') {
                await prisma.trajectories.create({
                    data: {
                        taxi_id: parseInt(field1),
                        date: new Date(field2),
                        latitude: parseFloat(field3),
                        longitude: parseFloat(field4),
                    },
                });
            }
        }

    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}
//Leer una carpeta especifica de la línea de comandos
//Filtrar los archivos de texto en la carpeta.
//Llamar a processFile para cada archivo de texto para procesar e insertar sus datos en la base de datos.

// Funcion Leer, identificar o filtrar y procesar (llamar a la funcion)
async function processFolderAndInsertRecords(): Promise<void> {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      })
        try {
            // Obtener los argumentos de la línea de comandos, omitiendo los dos primeros elementos.
            const args: string[] = process.argv.slice(2);
        // console.log("🚀 ~ processFolderAndInsertRecords ~ args:", args);
         // Buscar el argumento que no comienza con '--type=' y lo asigna a folderPath.
         // usar libreria para parametros // commander
        const folderPath: string | undefined = args.find(arg => !arg.startsWith('--type='));
        // Buscar el argumento que comienza con '--type=' y lo asigna a typeArg.
        const typeArg: string | undefined = args.find(arg => arg.startsWith('--type='));

        // console.log("folderpath", folderPath);
        // console.log("typeArg", typeArg);
        
        // Verifica que ambos argumentos (folderPath y typeArg) existan. Si no, lanza un error.
        if (!folderPath || !typeArg) {
            throw new Error("Missing folder path or type argument.");
        }
        // Extraer el valor del tipo del argumento typeArg.
        const type: string | undefined  = typeArg?.split('=')[1];
        // console.log("Este es el type", type);
        
        // Combinar folderPath y type para obtener la ruta completa de la carpeta a procesar.
        const folderToProcess: string = path.join(folderPath, type);
        // console.log("🚀 ~ processFolderAndInsertRecords ~ folderToProcess:", folderToProcess);
        
        // Leer el contenido de la carpeta especificada y obtener una lista de archivos.
        const files: string[] = await fs.readdir(folderToProcess);
        // console.log("🚀 ~ processFolderAndInsertRecords ~ files:", files);

        // Filtrar los archivos para quedarnos solo con aquellos que tienen la extensión .txt.
        const txtFiles: string[] = files.filter((file: string) => file.endsWith('.txt'));

        // Iterar sobre cada archivo de texto encontrado.
        for (const file of txtFiles) {
            // Construir la ruta completa del archivo.
            const filePath: string = path.join(folderToProcess, file);
            // console.log("🚀 ~ processFolderAndInsertRecords ~ filePath:", filePath);

            // Llamar a la función processFile(arriba) para procesar el archivo.
            await processFile(filePath, type, prisma);
        }
        //todas las líneas fueron procesadas correctamente.   
        console.log("All lines processed successfully."); 
        } catch (error) {
            console.error("Error in processFolderAndInsertRecords:", error)    
        }
}
processFolderAndInsertRecords()
