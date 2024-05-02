export const options = { // opciones de swagger
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Fleet Management API',
            version: '1.0.0',
            description: "Documentación Fleet Management Api"
        },
        servers: [
            {
                url: "http://localhost:3001"
            },
        ],
        components: {
            schemas: {
                Taxis: {
                    type: "object",
                    // required: ["plate"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 9275
                        },
                        plate: {
                            type: "string",
                            example: "ENPB-7532"
                        },
                    },
                },
                Trajectories: {
                    type: "object",
                    // required: ["date", "latitude","longitude"],
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64",
                            description: "ID de la trajectoria",
                            example: 22237
                        },
                        taxi_id: {
                            type: "integer",
                            description: "ID de taxi elacionado con esta trayectoria",
                            format: "int64",
                            example: 9275
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            example: "2008-02-02 17:15:21"
                        },
                        latitude: {
                            type: "double",
                            description: "Latitud de la posición",
                            format: "int64",
                            example: 116.27741
                        },
                        longitude: {
                            type: "double",
                            description: "Longitud de la posición",
                            format: "int64",
                            example: 39.89958
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Mensaje de error"
                        }
                    }
                }
            },
        },
    },
    apis:["./src/routes/*.ts"] // importar archivos de routes en general
}