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
                            example: 280
                        },
                        plate: {
                            type: "string",
                            example: "DDNG-0487"
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
                            example: 20
                        },
                        taxi_id: {
                            type: "integer",
                            description: "ID de taxi relacionado con esta trayectoria",
                            format: "int64",
                            example: 6418
                        },
                        date: {
                            type: "string",
                            format: "date-time",
                            example: "2008-02-02 15:21:12"
                        },
                        latitude: {
                            type: "double",
                            description: "Latitud de la posición",
                            format: "int64",
                            example: 116.33652
                        },
                        longitude: {
                            type: "double",
                            description: "Longitud de la posición",
                            format: "int64",
                            example: 39.93665
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