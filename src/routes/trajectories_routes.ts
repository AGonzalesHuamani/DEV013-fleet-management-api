import express, { Router } from 'express';
import { getAllTrajectories, getLocationHistory} from '../controller/trajectories_controller'

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
 *          description: El id de la trayectoria solicitado no se encontró.
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

// routerTrajectories.get('/trajectories/last' );
// solo recibe como parametros la paginacion

export default routerTrajectories;