# Etapa 1: Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Etapa 2: Desarrollo 
FROM base AS development
EXPOSE 5173
# Importante: --host para que Docker deje pasar la conexión
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Etapa 3: Build 
FROM base AS build
RUN npm run build

# Etapa 4: Producción
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
