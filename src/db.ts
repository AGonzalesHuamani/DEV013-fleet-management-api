import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default prisma

//Importante : debe volver a ejecutar el prisma generatecomando 
//después de cada cambio realizado en su esquema Prisma 
//para actualizar el código del Cliente Prisma generado.
//https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client