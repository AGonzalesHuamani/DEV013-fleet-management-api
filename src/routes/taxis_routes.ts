import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * Get track
 * @swagger
 * /taxis:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Obtener taxis"
 *      description: Este endpoint es para obtener listado de taxis
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
 *                          $ref: '#/components/schemas/Taxis'
 */
