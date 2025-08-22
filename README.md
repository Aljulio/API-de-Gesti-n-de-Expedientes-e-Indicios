# API de Gestión de Expedientes e Indicios

## Descripción del Proyecto

Esta es una API RESTful desarrollada con **TypeScript y Express** para la gestión de expedientes e indicios, con autenticación JWT y control de roles. La persistencia de datos se gestiona en una base de datos de **SQL Server** utilizando procedimientos almacenados.



## Requisitos

Para ejecutar este proyecto, necesitas tener instalado lo siguiente:

- **Node.js**: Versión 14 o superior.
- **Docker**: Para ejecutar la base de datos de SQL Server.

---

## Configuración del Entorno y Arranque

### 1. Clonar el Repositorio e Instalar Dependencias

Primero, clona el repositorio e instala las dependencias del proyecto.

```bash
git clone <URL_DEL_REPOSITORIO>
cd api-expedientes
npm install
````

### 2\. Configurar las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo de ejemplo `.env.example`.

```bash
cp .env.example .env
```

Abre el archivo `.env` y completa la configuración de la base de datos y la contraseña de `sa` que usarás en Docker.

```ini
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
```

### 3\. Levantar la Base de Datos con Docker

Utiliza Docker Compose para iniciar el contenedor de SQL Server. Asegúrate de que la contraseña `YourStrongPassword!` en `docker-compose.yml` sea la misma que en tu archivo `.env`.

```bash
docker-compose up -d
```

### 4\. Crear la Base de Datos y los Procedimientos Almacenados

El proyecto incluye scripts para crear la base de datos, las tablas y los procedimientos almacenados. Ejecuta los siguientes comandos en orden:

```bash
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
```

### 5\. Iniciar la API

Una vez que la base de datos está lista, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

-----

## Documentación y Ejemplos de Uso

La API está documentada con **Swagger UI**. Puedes acceder a la documentación interactiva en:
`http://localhost:3000/api-docs`

Desde ahí, puedes probar todos los endpoints. Para usar las rutas protegidas, primero inicia sesión con uno de los siguientes usuarios:

  * **Técnico**: `tecnico@prueba.com` / `password123`
  * **Coordinador**: `coordinador@prueba.com` / `password123`

<!-- end list -->

```
---

### 2. Archivos de Configuración

Crea estos archivos en la raíz de tu proyecto.

#### `.gitignore`
```

# Ignorar archivos de entorno, dependencias y compilación

.env
/node\_modules
/dist

```

#### `.env.example`
```

# Configuración del servidor

PORT=3000

# Configuración de la base de datos

DB\_USER=sa
DB\_PASSWORD=YourStrongPassword\!
DB\_SERVER=localhost
DB\_DATABASE=api\_expedientes
DB\_PORT=1433

# JWT

JWT\_SECRET=supersecret

````

#### `package.json` (revisado)
```json
{
  "name": "api-expedientes",
  "version": "1.0.0",
  "description": "API de Gestión de Expedientes e Indicios",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon --exec ts-node --files src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/mssql": "^9.1.5",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.6",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mssql": "^11.0.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  }
}
````

-----

### 3\. Código Completo de la API

Asegúrate de que tus archivos de código se vean exactamente así.

#### `src/server.ts`

```typescript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import router from './routes/index';

dotenv.config();

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

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('API de Expedientes e Indicios - ¡En funcionamiento!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api-docs`);
});
```

#### `src/swagger.json`

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API de Gestión de Expedientes e Indicios",
    "version": "1.0.0",
    "description": "API REST para la gestión de expedientes e indicios, con autenticación JWT y control de roles.",
    "contact": {
      "name": "Ing. Carmelo Mayén"
    }
  },
  "servers": [
    {
      "url": "http://localhost:3000/api",
      "description": "Servidor de desarrollo"
    }
  ],
  "tags": [
    { "name": "Autenticación", "description": "Iniciar sesión y obtener un token JWT." },
    { "name": "Usuarios", "description": "Gestión de usuarios." },
    { "name": "Expedientes", "description": "Gestión de expedientes." },
    { "name": "Indicios", "description": "Gestión de indicios." }
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Inicia sesión y obtiene un token JWT",
        "tags": ["Autenticación"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["email", "password"],
                "properties": {
                  "email": { "type": "string", "example": "tecnico@prueba.com" },
                  "password": { "type": "string", "example": "password123" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Login exitoso. Devuelve un token JWT.", "content": { "application/json": { "schema": { "type": "object", "properties": { "token": { "type": "string" }, "rol": { "type": "string" } } } } } },
          "401": { "description": "Email o contraseña incorrectos." }
        }
      }
    },
    "/usuarios": {
      "post": {
        "summary": "Crea un nuevo usuario",
        "tags": ["Usuarios"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["nombre", "email", "password", "rol"],
                "properties": {
                  "nombre": { "type": "string", "example": "Nuevo Usuario" },
                  "email": { "type": "string", "example": "nuevo.usuario@ejemplo.com" },
                  "password": { "type": "string", "example": "contrasena123" },
                  "rol": { "type": "string", "enum": ["tecnico", "coordinador"], "example": "tecnico" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Usuario creado exitosamente." },
          "400": { "description": "Todos los campos son obligatorios." },
          "409": { "description": "El correo electrónico ya existe." },
          "500": { "description": "Error interno del servidor." }
        }
      }
    },
    "/expedientes": {
      "get": {
        "summary": "Obtiene una lista paginada de expedientes",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [
          { "in": "query", "name": "page", "schema": { "type": "integer", "default": 1 }, "description": "Número de página." },
          { "in": "query", "name": "limit", "schema": { "type": "integer", "default": 10 }, "description": "Número de expedientes por página." },
          { "in": "query", "name": "codigo", "schema": { "type": "string" }, "description": "Filtra por el código del expediente." }
        ],
        "responses": {
          "200": { "description": "Lista de expedientes.", "content": { "application/json": { "schema": { "type": "array", "items": { "$ref": "#/components/schemas/Expediente" } } } } },
          "401": { "description": "No autenticado." }
        }
      },
      "post": {
        "summary": "Crea un nuevo expediente",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["codigo", "descripcion"],
                "properties": {
                  "codigo": { "type": "string", "example": "EXP-001" },
                  "descripcion": { "type": "string", "example": "Expediente de prueba." }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Expediente creado exitosamente." },
          "400": { "description": "Código y descripción son obligatorios." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo técnico)." }
        }
      }
    },
    "/expedientes/{id}": {
      "get": {
        "summary": "Obtiene un expediente por su ID",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del expediente." }],
        "responses": {
          "200": { "description": "Detalles del expediente.", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/Expediente" } } } },
          "404": { "description": "Expediente no encontrado." },
          "401": { "description": "No autenticado." }
        }
      },
      "put": {
        "summary": "Actualiza un expediente",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del expediente." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["codigo", "descripcion"],
                "properties": {
                  "codigo": { "type": "string", "example": "EXP-002" },
                  "descripcion": { "type": "string", "example": "Expediente actualizado." }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Expediente actualizado exitosamente." },
          "400": { "description": "Datos incompletos." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo técnico)." }
        }
      }
    },
    "/expedientes/{id}/estado": {
      "patch": {
        "summary": "Cambia el estado de un expediente",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del expediente." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["estado"],
                "properties": {
                  "estado": { "type": "string", "enum": ["Aprobado", "Rechazado"], "example": "Aprobado" },
                  "justificacion": { "type": "string", "nullable": true, "example": "Revisado y aprobado." }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Estado del expediente actualizado exitosamente." },
          "400": { "description": "Estado inválido o justificación obligatoria." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo coordinador)." }
        }
      }
    },
    "/expedientes/{id}/activo": {
      "patch": {
        "summary": "Realiza la eliminación lógica de un expediente",
        "tags": ["Expedientes"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del expediente." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["activo"],
                "properties": {
                  "activo": { "type": "boolean", "example": false }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Estado de activo actualizado." },
          "400": { "description": "El campo 'activo' debe ser booleano." },
          "401": { "description": "No autenticado." }
        }
      }
    },
    "/expedientes/{expedienteId}/indicios": {
      "post": {
        "summary": "Crea un nuevo indicio para un expediente",
        "tags": ["Indicios"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "expedienteId", "required": true, "schema": { "type": "integer" }, "description": "ID del expediente padre." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": { "schema": { "$ref": "#/components/schemas/Indicio" } }
          }
        },
        "responses": {
          "201": { "description": "Indicio creado exitosamente." },
          "400": { "description": "La descripción es obligatoria." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo técnico)." }
        }
      }
    },
    "/indicios/{id}": {
      "put": {
        "summary": "Actualiza un indicio por su ID",
        "tags": ["Indicios"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del indicio." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": { "schema": { "$ref": "#/components/schemas/Indicio" } }
          }
        },
        "responses": {
          "200": { "description": "Indicio actualizado exitosamente." },
          "400": { "description": "La descripción es obligatoria." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo técnico)." }
        }
      }
    },
    "/indicios/{id}/activo": {
      "patch": {
        "summary": "Realiza la eliminación lógica de un indicio",
        "tags": ["Indicios"],
        "security": [{ "bearerAuth": [] }],
        "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" }, "description": "ID del indicio." }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "type": "object", "required": ["activo"], "properties": { "activo": { "type": "boolean", "example": false } } }
            }
          }
        },
        "responses": {
          "200": { "description": "Estado de activo del indicio actualizado." },
          "400": { "description": "El campo 'activo' debe ser booleano." },
          "401": { "description": "No autenticado." },
          "403": { "description": "Acceso denegado (solo técnico)." }
        }
      }
    }
  },
  "components": {
    "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } },
    "schemas": {
      "Expediente": {
        "type": "object",
        "properties": {
          "id": { "type": "integer", "example": 1 },
          "codigo": { "type": "string", "example": "EXP-001" },
          "descripcion": { "type": "string", "example": "Expediente de prueba." },
          "estado": { "type": "string", "enum": ["Pendiente", "Aprobado", "Rechazado"], "example": "Pendiente" },
          "justificacion": { "type": "string", "nullable": true },
          "tecnico_id": { "type": "integer", "example": 3 },
          "aprobador_id": { "type": "integer", "nullable": true },
          "fecha_creacion": { "type": "string", "format": "date-time" },
          "fecha_estado": { "type": "string", "format": "date-time", "nullable": true },
          "activo": { "type": "boolean", "example": true }
        }
      },
      "Indicio": {
        "type": "object",
        "properties": {
          "id": { "type": "integer", "example": 1 },
          "expediente_id": { "type": "integer", "example": 1 },
          "peso": { "type": "number", "example": 2.5 },
          "color": { "type": "string", "example": "rojo" },
          "tamano": { "type": "string", "example": "pequeño" },
          "descripcion": { "type": "string", "example": "Indicio encontrado en la escena." },
          "activo": { "type": "boolean", "example": true }
        }
      }
    }
  }
}
```

-----

### 4\. Scripts SQL

Estos son los scripts que se ejecutan una vez para configurar la base de datos.

#### `src/scripts/schema.sql`

```sql
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'api_expedientes')
BEGIN
    CREATE DATABASE api_expedientes;
END;
GO
USE api_expedientes;
GO
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    activo BIT DEFAULT 1
);
CREATE TABLE Expedientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    justificacion VARCHAR(255),
    tecnico_id INT NOT NULL,
    aprobador_id INT,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_estado DATETIME,
    activo BIT DEFAULT 1,
    FOREIGN KEY (tecnico_id) REFERENCES Usuarios(id)
);
CREATE TABLE Indicios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    expediente_id INT NOT NULL,
    peso DECIMAL(10, 2),
    color VARCHAR(50),
    tamano VARCHAR(50),
    descripcion VARCHAR(255) NOT NULL,
    activo BIT DEFAULT 1,
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(id)
);
```

#### `src/sp/usuarios/login.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Usuarios_Login @email VARCHAR(100)
AS
BEGIN
    SELECT id, nombre, email, password_hash, rol FROM Usuarios WHERE email = @email;
END;
GO
```

#### `src/sp/usuarios/crear.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Usuarios_Crear
    @nombre VARCHAR(100), @email VARCHAR(100), @password_hash VARCHAR(255), @rol VARCHAR(50)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Usuarios WHERE email = @email)
    BEGIN RETURN 1; END;
    INSERT INTO Usuarios (nombre, email, password_hash, rol)
    VALUES (@nombre, @email, @password_hash, @rol);
    RETURN 0;
END;
GO
```

#### `src/sp/expedientes/listar.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_Listar
    @pageNumber INT, @pageSize INT, @filterByCodigo VARCHAR(50) = NULL, @filterByEstado VARCHAR(50) = NULL
AS
BEGIN
    SELECT id, codigo, descripcion, estado, tecnico_id, aprobador_id, fecha_creacion, fecha_estado, activo
    FROM Expedientes
    WHERE activo = 1
    AND (@filterByCodigo IS NULL OR codigo LIKE '%' + @filterByCodigo + '%')
    AND (@filterByEstado IS NULL OR estado = @filterByEstado)
    ORDER BY fecha_creacion DESC
    OFFSET (@pageNumber - 1) * @pageSize ROWS
    FETCH NEXT @pageSize ROWS ONLY;
END;
GO
```

#### `src/sp/expedientes/obtener.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_Obtener @id INT
AS
BEGIN
    SELECT id, codigo, descripcion, estado, justificacion, tecnico_id, aprobador_id, fecha_creacion, fecha_estado, activo
    FROM Expedientes
    WHERE id = @id AND activo = 1;
END;
GO
```

#### `src/sp/expedientes/crear.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_Crear
    @codigo VARCHAR(50), @descripcion VARCHAR(255), @tecnico_id INT
AS
BEGIN
    INSERT INTO Expedientes (codigo, descripcion, estado, tecnico_id)
    VALUES (@codigo, @descripcion, 'Pendiente', @tecnico_id);
    SELECT SCOPE_IDENTITY() AS id;
END;
GO
```

#### `src/sp/expedientes/actualizar.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_Actualizar
    @id INT, @codigo VARCHAR(50), @descripcion VARCHAR(255), @tecnico_id INT
AS
BEGIN
    UPDATE Expedientes SET codigo = @codigo, descripcion = @descripcion
    WHERE id = @id AND tecnico_id = @tecnico_id AND activo = 1;
END;
GO
```

#### `src/sp/expedientes/cambiar_estado.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_CambiarEstado
    @id INT, @estado VARCHAR(50), @justificacion VARCHAR(255), @aprobador_id INT
AS
BEGIN
    UPDATE Expedientes SET estado = @estado, justificacion = @justificacion, aprobador_id = @aprobador_id, fecha_estado = GETDATE()
    WHERE id = @id AND activo = 1;
END;
GO
```

#### `src/sp/expedientes/activar_desactivar.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Expedientes_ActivarDesactivar @id INT, @activo BIT
AS
BEGIN
    UPDATE Expedientes SET activo = @activo WHERE id = @id;
END;
GO
```

#### `src/sp/indicios/listar_por_expediente.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Indicios_ListarPorExpediente @expediente_id INT
AS
BEGIN
    SELECT id, expediente_id, peso, color, tamano, descripcion, activo FROM Indicios
    WHERE expediente_id = @expediente_id AND activo = 1;
END;
GO
```

#### `src/sp/indicios/crear.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Indicios_Crear
    @expediente_id INT, @peso DECIMAL(10, 2), @color VARCHAR(50), @tamano VARCHAR(50), @descripcion VARCHAR(255)
AS
BEGIN
    INSERT INTO Indicios (expediente_id, peso, color, tamano, descripcion)
    VALUES (@expediente_id, @peso, @color, @tamano, @descripcion);
    SELECT SCOPE_IDENTITY() AS id;
END;
GO
```

#### `src/sp/indicios/actualizar.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Indicios_Actualizar
    @id INT, @peso DECIMAL(10, 2), @color VARCHAR(50), @tamano VARCHAR(50), @descripcion VARCHAR(255)
AS
BEGIN
    UPDATE Indicios SET peso = @peso, color = @color, tamano = @tamano, descripcion = @descripcion
    WHERE id = @id AND activo = 1;
END;
GO
```

#### `src/sp/indicios/activar_desactivar.sql`

```sql
USE api_expedientes;
GO
CREATE PROCEDURE sp_Indicios_ActivarDesactivar @id INT, @activo BIT
AS
BEGIN
    UPDATE Indicios SET activo = @activo WHERE id = @id;
END;
GO
```
