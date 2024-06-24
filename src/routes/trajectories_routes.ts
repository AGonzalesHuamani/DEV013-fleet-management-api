import express, { Router } from 'express';
import { getAllTrajectories, getLocationHistory, getLastLocation, getExportExcel } from '../controller/trajectories_controller'

const routerTrajectories: Router = express.Router();

/**
 * Get track
 * @openapi
 * /trajectories:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener todas las trayectorias"
 *      description: Este endpoint es para obtener trayectorias
 *      parameters:
 *        - in: query
 *          name: skip
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 */
routerTrajectories.get('/trajectories', getAllTrajectories );

/**
 * Get track
 * @openapi
 * /trajectories/{id}:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Buscar trayectoria por Id"
 *      description: "Este endpoint es para buscar trayectoria por Id."
 *      parameters:
 *      
 *      responses:
 *        '200':
 *          description: Operación exitosa. Devuelve el trayectoria buscado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trajectories'
 *        '404':
 *          description: No se encontró ninguna trayectoria con el id proporcionado.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 *        '500':
 *          description: Error en el servidor.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */
routerTrajectories.get('/trajectories/:id', getLocationHistory );

/**
 * Get track
 * @openapi
 * /lastLocation:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener la última ubicación de los taxis"
 *      description: Este endpoint es para obtener la última ubicación de los taxis
 *      parameters:
 *        - in: query
 *          name: skip
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              taxiId:
 *                                  type: integer
 *                                  description: "Id del taxi"
 *                                  default: 6598
 *                              date:
 *                                  type: string 
 *                                  format: date-time
 *                                  description: "Fecha y hora de la ubicación"
 *                              latitude:
 *                                  type: number
 *                                  description: "Latitud de la ubicación"
 *                                  default: 116.32706
 *                              longitude:
 *                                  type: number
 *                                  description: "Longitud de la ubicación"
 *                                  default: 39.84801
 */
routerTrajectories.get('/lastlocation', getLastLocation); // ultima ubicación

routerTrajectories.get("/exportExcel/:id", getExportExcel);

export default routerTrajectories;