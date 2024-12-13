
# TOMAR EN CUENTA EL DOCKER IGNORE
# dist/ node_modules/ .git

FROM node:18-alpine as deps

ENV NODE_ENV=production
ENV PORT=80

# COPIAR DESDE MI PC Al DIRECTORIO EN EL WORKDIR
# COPY . /app -> COPIA TODO DEL DIR ACTUAL AL DEL CONTENEDOR
COPY package.json ./app/
RUN npm install --frozen-lockfile --silent
# EXPONER PUERTO DE LA APLICACION
EXPOSE 80
# COMANDO PARA EJECUTAR LA APLICACIÓN
CMD ["npm", "start"]

# BUILDER
FROM node:18-alpine as builder
COPY --from=deps /app/node_modules ./app/node_modules
COPY . .
RUN npm build

# RUNNER
FROM node:18-alpine as runner
RUN npm i --prod
COPY --from=builder /app/dist ./app/dist
CMD ["node", "dist/src/main"]


