
# TOMAR EN CUENTA EL DOCKER IGNORE: dist/ node_modules/ .git

# CREAR NETWORK: docker network create mi-red-bridge

# CREAR IMAGEN: docker build -t nest-rest-api .
    # El Punto significa el path relativo desde donde se ejecuta el compando

# CREAR CONTENEDOR DESDE LA IMAGEN
    # El -p 80:3000 es para dirigir mi puerto 80 al puerto 3000 del contenedor

    # Simple
    # docker run -p 80:3000 --name nest-cont nest-rest-api

    # Con ENV
    # docker run -e NODE_ENV=production -e PORT=3000 -p 3000:3000 mi-imagen

    # Con Network
    # docker run -d --name contenedor1 --network mi-red-bridge imagen1

# Renombrar Imagen
    # docker image tag nest-rest rssa792/products-backend:1.0.0
# Loguear en DockerHub
    # docker login
# Push Imagen to Repo
    # docker push rssa792/products-backend:1.0.0

FROM node:18-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# INSTALAR PNPM GLOBALMENTE
RUN npm install -g pnpm
# INSTALAR DEPENDENCIAS
RUN pnpm install --frozen-lockfile --silent
COPY . .
RUN pnpm run build
# EXPONER PUERTO DE LA APLICACION DEL CONTENEDOR, NO EN EL HOST EXPOSE $PORT
# COMANDO PARA EJECUTAR LA APLICACIÓN
CMD ["node", "dist/src/main"]
