# Evento de Promociones 

Esta es una plataforma web para que clientes confirmen su asistencia al evento de promociones.
La plataforma permite que seleccionen servicios y productos de su interés, y reciban descuentos personalizados.

## Tecnologías Utilizadas
- **Frontend:** 
    - React
    - TypeScript
    - Bootstrap
    - Vite
- **Backend:** 
    - Node.js
    - TypeScript
    - Express
- **Base de datos:** 
    - MySQL
- **Infraestructura:** 
    - Docker
    - Railway

## Requisitos para correr localmente
- Node.js v22+
- Docker Desktop
- MySQL Workbench

## Correr con Docker
1. Clonar el repositorio:

    git clone https://github.com/monicapar14/EventoPromociones.git
    
    cd EventoPromociones

2. Crear el archivo de variables de entorno del backend:
    # backend/.env
        PORT=8080
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=CONTRASEÑA
        DB_NAME=evento_promociones

3. Levantar todos los servicios:
    
    docker-compose up --build

4. Abrir el navegador y copiar la siguiente URL:
    
    http://localhost

## Correr sin Docker
### Backend
    cd backend
    npm install
    npm run dev

### Frontend
    cd frontend
    npm install
    npm run dev

## Variables de entorno

### Backend (Archivo .env)
| Variable | Descripción |
|---|---|
| PORT    |  Puerto 8080 |
| DB_HOST | localhost |
| DB_USER | root |
| DB_PASSWORD | Contraseña de MySQL |
| DB_NAME | evento_promociones |

### Frontend (Archivo .env.production)
| Variable | Descripción |
|---|---|
| VITE_API_URL | eventopromociones-production.up.railway.app |

## Estructura del proyecto

    EventoPromociones/
    ├── backend/
    │   ├── logs/
    │   │   └── notificaciones.log
    │   ├── src/
    │   │   ├── controllers/
    |   │   │   ├── confirmacionesController.ts
    |   │   │   ├── productosController.ts
    |   │   │   ├── serviciosController.ts
    │   │   ├── routes/
    |   │   │   ├── confirmaciones.ts
    |   │   │   ├── productos.ts
    |   │   │   ├── servicios.ts
    │   │   ├── db.ts
    │   │   ├── index.ts
    │   │   └── logs.ts
    │   ├── .env    
    │   ├── Dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   └── tsconfig.json
    ├── base de datos/
    │   ├── db.sql
    │   ├── inserts.sql 
    ├── frontend/
    │   ├── public/
    │   │   ├── favicon.svg
    │   │   ├── icons.svg
    │   ├── src/
    │   │   ├── components/
    |   │   │   ├── Layout.tsx
    │   │   ├── Interfaces/
    |   │   │   ├── DatosConfirmacion.tsx
    |   │   │   ├── DatosPersona.tsx
    |   │   │   ├── productosDisponibles.tsx
    |   │   │   ├── serviciosDisponibles.tsx
    │   │   ├── views/
    |   │   │   ├── Confirmacion.tsx
    |   │   │   ├── ExitoEnvio.tsx
    |   │   │   ├── Formulario.tsx
    |   │   │   ├── Productos.tsx
    |   │   │   ├── Servicios.tsx
    │   │   ├── api.ts
    │   │   ├── App.tsx
    │   │   ├── index.css
    │   │   └── main.tsx
    │   ├── Dockerfile
    │   ├── nginx.conf
    │   ├── .env.production
    │   └── package.json
    ├── database.sql
    ├── docker-compose.yml
    ├── DECISIONS.md
    └── README.md

## URL en producción

- **Frontend:** https://capable-achievement-production-bf6e.up.railway.app/

- **Backend:** eventopromociones-production.up.railway.app

## Funcionalidades

- Formulario de confirmación en 3 pasos
- Selección de servicios y productos con descuentos automáticos
- Control de cupo máximo del evento
- Sesión por medio del localStorage
- Utilización de logs para poder notificar al equipo de ventas
- Vista de resumen antes de confirmar