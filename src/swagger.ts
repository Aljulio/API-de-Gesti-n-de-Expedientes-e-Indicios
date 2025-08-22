// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from './swagger.json'; // <--- Importa el JSON

// Modificamos para leer directamente del JSON
const swaggerDocs = swaggerDocument;

export default swaggerDocs;