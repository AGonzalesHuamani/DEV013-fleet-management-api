"use strict";
// node upload-gps-data.js C:\Users\USUARIO\OneDrive\Escritorio\laboratoria\proyecto5\DEV013-fleet-management-api\pruebas
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// modulo file system 
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const path = __importStar(require("path"));
// modulo para trabajar con las rutas
// const path = require('path');
// leer el directorio
// leer el archivo
// leer linea por linea
// dividir deacuerdo al formato
//recorrerlo e insertarlo a la base de datos
// agregar las validaciones "no hay mucho que validar"
// manejar el error
// console.log("path", path);
console.log("process", process.argv.slice(2));
// const argv = process.argv.slice(2)
// console.log("argv", argv);
// // const data = fs.readFileSync(argv, "utf-8")
// // console.log("data", data );
// // const content = fs.readdirSync(argv)
// // console.log("content", content);
// const pathJoin = path.join(__dirname, "./pruebas/taxis.txt")
// console.log("pathJoin", pathJoin);
// const content = fs.readFileSync(pathJoin, "utf-8")
// console.log("content2", content);
//filePath: La ruta del archivo que se va a procesar.
//type: string: El tipo de datos que se están procesando 
// Leer y procesar un archivo de texto || Insertar registros en la BD
function processFile(filePath, type, prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1ero leer el contenido del archivo como una cadena.
            const data = yield fs_1.promises.readFile(filePath, 'utf-8');
            // 2do Dividir el contenido del archivo en líneas, elimina los espacios en blanco y filtra las líneas vacías.
            const lines = data.split('\n').map((line) => line.trim()).filter(Boolean);
            for (const line of lines) {
                // Dividir la línea en campos separados por comas.
                const [field1, field2, field3, field4] = line.split(',');
                // console.log(" estamos en line", line);
                if (type === 'taxis') {
                    //crear un registro en la BD utilizando Prisma.
                    yield prisma.taxis.create({
                        data: {
                            id: parseInt(field1),
                            plate: field2,
                        },
                    });
                }
                else if (type === 'trajectories') {
                    yield prisma.trajectories.create({
                        data: {
                            taxi_id: parseInt(field1),
                            date: new Date(field2),
                            latitude: parseFloat(field3),
                            longitude: parseFloat(field4),
                        },
                    });
                }
            }
        }
        catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    });
}
//Leer una carpeta especifica de la línea de comandos
//Filtrar los archivos de texto en la carpeta.
//Llamar a processFile para cada archivo de texto para procesar e insertar sus datos en la base de datos.
// Funcion Leer, identificar o filtrar y procesar (llamar a la funcion)
// nombre descriptivo 
function processFolderAndInsertRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
        try {
            // Obtener los argumentos de la línea de comandos, omitiendo los dos primeros elementos.
            const args = process.argv.slice(2);
            // console.log("🚀 ~ processFolderAndInsertRecords ~ args:", args);
            // Buscar el argumento que no comienza con '--type=' y lo asigna a folderPath.
            // usar libreria para parametros // commander
            const folderPath = args.find(arg => !arg.startsWith('--type='));
            // Buscar el argumento que comienza con '--type=' y lo asigna a typeArg.
            const typeArg = args.find(arg => arg.startsWith('--type='));
            // console.log("folderpath", folderPath);
            // console.log("typeArg", typeArg);
            // Verifica que ambos argumentos (folderPath y typeArg) existan. Si no, lanza un error.
            if (!folderPath || !typeArg) {
                throw new Error("Missing folder path or type argument.");
            }
            // Extraer el valor del tipo del argumento typeArg.
            const type = typeArg === null || typeArg === void 0 ? void 0 : typeArg.split('=')[1];
            // console.log("Este es el type", type);
            // Combinar folderPath y type para obtener la ruta completa de la carpeta a procesar.
            const folderToProcess = path.join(folderPath, type);
            // console.log("🚀 ~ processFolderAndInsertRecords ~ folderToProcess:", folderToProcess);
            // Leer el contenido de la carpeta especificada y obtener una lista de archivos.
            const files = yield fs_1.promises.readdir(folderToProcess);
            // console.log("🚀 ~ processFolderAndInsertRecords ~ files:", files);
            // Filtrar los archivos para quedarnos solo con aquellos que tienen la extensión .txt.
            const txtFiles = files.filter((file) => file.endsWith('.txt'));
            // Iterar sobre cada archivo de texto encontrado.
            for (const file of txtFiles) {
                // Construir la ruta completa del archivo.
                const filePath = path.join(folderToProcess, file);
                // console.log("🚀 ~ processFolderAndInsertRecords ~ filePath:", filePath);
                // Llamar a la función processFile(arriba) para procesar el archivo.
                yield processFile(filePath, type, prisma);
            }
            //todas las líneas fueron procesadas correctamente.   
            console.log("All lines processed successfully.");
        }
        catch (error) {
            console.error("Error in processFolderAndInsertRecords:", error);
        }
    });
}
processFolderAndInsertRecords();
