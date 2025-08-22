API de Gestión de Expedientes e Indicios
Descripción del Proyecto
Esta es una API RESTful desarrollada con TypeScript y Express que implementa un CRUD y un flujo de aprobación para expedientes e indicios. El sistema cuenta con autenticación de usuarios mediante JWT y un control de roles (técnico y coordinador) para restringir el acceso a funcionalidades específicas. La persistencia de datos se gestiona en una base de datos de SQL Server a través de procedimientos almacenados.

Requisitos
Para ejecutar este proyecto, necesitas tener instalado lo siguiente:

Node.js: Versión 14 o superior.

Docker: Para ejecutar la base de datos de SQL Server.

Configuración del Entorno y Arranque
1. Clonar el Repositorio e Instalar Dependencias
Primero, clona el repositorio e instala las dependencias del proyecto.

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
Utiliza Docker Compose para iniciar el contenedor de SQL Server. Asegúrate de que la contraseña YourStrongPassword! en docker-compose.yml sea la misma que en tu archivo .env.

docker-compose up -d

4. Crear la Base de Datos y los Procedimientos Almacenados
El proyecto incluye scripts para crear la base de datos, las tablas y los procedimientos almacenados. Ejecuta los siguientes comandos en orden:

# Crear la base de datos y las tablas
docker cp src/scripts/schema.sql sql_server_db:/tmp/schema.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/schema.sql -C

# Crear los procedimientos almacenados para los usuarios
docker cp src/sp/usuarios/login.sql sql_server_db:/tmp/login.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/login.sql -C
docker cp src/sp/usuarios/crear.sql sql_server_db:/tmp/crear_usuario.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/crear_usuario.sql -C

# Crear los procedimientos almacenados para los expedientes
docker cp src/sp/expedientes/listar.sql sql_server_db:/tmp/exp_listar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_listar.sql -C
docker cp src/sp/expedientes/obtener.sql sql_server_db:/tmp/exp_obtener.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_obtener.sql -C
docker cp src/sp/expedientes/crear.sql sql_server_db:/tmp/exp_crear.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_crear.sql -C
docker cp src/sp/expedientes/actualizar.sql sql_server_db:/tmp/exp_actualizar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_actualizar.sql -C
docker cp src/sp/expedientes/cambiar_estado.sql sql_server_db:/tmp/exp_cambiar_estado.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_cambiar_estado.sql -C
docker cp src/sp/expedientes/activar_desactivar.sql sql_server_db:/tmp/exp_activar_desactivar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/exp_activar_desactivar.sql -C

# Crear los procedimientos almacenados para los indicios
docker cp src/sp/indicios/listar_por_expediente.sql sql_server_db:/tmp/ind_listar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/ind_listar.sql -C
docker cp src/sp/indicios/crear.sql sql_server_db:/tmp/ind_crear.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/ind_crear.sql -C
docker cp src/sp/indicios/actualizar.sql sql_server_db:/tmp/ind_actualizar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/ind_actualizar.sql -C
docker cp src/sp/indicios/activar_desactivar.sql sql_server_db:/tmp/ind_activar_desactivar.sql
docker exec -it sql_server_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'YourStrongPassword!' -i /tmp/ind_activar_desactivar.sql -C

5. Iniciar la API
Una vez que la base de datos está lista, puedes iniciar el servidor de desarrollo:

npm run dev

Documentación y Ejemplos de Uso
La API está documentada con Swagger UI. Puedes acceder a la documentación interactiva en:
http://localhost:3000/api-docs

Desde ahí, puedes probar todos los endpoints. Para usar las rutas protegidas, primero inicia sesión con uno de los siguientes usuarios:

Técnico: tecnico@prueba.com / password123

Coordinador: coordinador@prueba.com / password123