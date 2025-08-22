API de Gestión de Expedientes e Indicios
Este proyecto es una API RESTful desarrollada con TypeScript y Express que implementa un CRUD y un flujo de aprobación para expedientes e indicios, con autenticación JWT y control de roles.

Estructura del Proyecto
El proyecto está organizado en una estructura de monorepo simple para separar la lógica del servidor de los scripts de base de datos.

.
├── .env.example
├── .gitignore
├── docker-compose.yml
├── node_modules/
├── package.json
├── tsconfig.json
└── src/
    ├── controllers/        # Lógica de negocio para cada ruta
    │   ├── auth.controller.ts
    │   ├── expediente.controller.ts
    │   ├── indicio.controller.ts
    │   └── usuario.controller.ts
    ├── db/                 # Lógica de conexión a la base de datos
    │   └── db.ts
    ├── models/             # Interfaces y modelos de datos
    │   ├── expediente.model.ts
    │   ├── indicio.model.ts
    │   └── usuario.model.ts
    ├── routes/             # Definición de rutas de la API
    │   ├── auth.routes.ts
    │   ├── expediente.routes.ts
    │   ├── indicio.routes.ts
    │   └── index.ts
    ├── sp/                 # Procedimientos almacenados (SQL)
    │   ├── expedientes/
    │   ├── indicios/
    │   └── usuarios/
    ├── scripts/            # Scripts para la creación de la base de datos
    │   ├── schema.sql
    │   └── seed.sql
    ├── auth/               # Middlewares de autenticación y roles
    │   ├── auth.middleware.ts
    │   ├── jwt.utils.ts
    │   └── role.middleware.ts
    ├── types/              # Definiciones de tipos para TypeScript
    │   └── express.d.ts
    ├── swagger.json        # Documentación OpenAPI para Swagger UI
    └── server.ts           # Servidor principal de Express

Requisitos
Para ejecutar este proyecto, necesitas tener instalado lo siguiente:

Node.js: Versión 14 o superior.

Docker: Para ejecutar la base de datos de SQL Server.

Configuración del Entorno y Arranque
1. Clonar el Repositorio e Instalar Dependencias
git clone <URL_DEL_REPOSITORIO>
cd api-expedientes
npm install


2. Configurar las Variables de Entorno
Crea un archivo .env en la raíz del proyecto basándote en el archivo de ejemplo .env.example.

cp .env.example .env


Abre el archivo .env y completa la configuración de la base de datos y la contraseña de sa que usarás en Docker.

# Configuración del servidor
PORT=3000

# Configuración de la base de datos
DB_USER=sa
DB_PASSWORD=YourStrongPassword!
DB_SERVER=localhost
DB_DATABASE=api_expedientes
DB_PORT=1433

# JWT
JWT_SECRET=supersecret


3. Levantar la Base de Datos con Docker
Utiliza Docker Compose para iniciar el contenedor de SQL Server.

docker-compose up -d


4. Crear la Base de Datos y los Procedimientos Almacenados
El proyecto incluye scripts para crear la base de datos, las tablas y los procedimientos almacenados. Ejecuta los siguientes comandos en orden:

# Crear la base de datos y las tablas
docker cp src/scripts/schema.sql sql_server_db:/tmp/schema.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/schema.sql -C

# Y así para todos los demás archivos de la carpeta src/sp/...


5. Iniciar la API
Una vez que la base de datos está lista, puedes iniciar el servidor de desarrollo:

npm run dev


Documentación y Ejemplos de Uso
La API está documentada con Swagger UI. Puedes acceder a la documentación interactiva en:
http://localhost:3000/api-docs

Desde ahí, puedes probar todos los endpoints. Para usar las rutas protegidas, primero inicia sesión con uno de los siguientes usuarios:

Técnico: tecnico@prueba.com / password123

Coordinador: coordinador@prueba.com / password123