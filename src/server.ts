// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json'; // <--- Importa directamente el archivo JSON
import router from './routes/index';

// Cargar variables de entorno
dotenv.config();

// Extender el objeto Request de Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        rol: string;
      };
    }
  }
}

// Inicializar la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', router);

// Documentación de la API con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // <--- Configuración para usar el JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Expedientes e Indicios - ¡En funcionamiento!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api-docs`);
});