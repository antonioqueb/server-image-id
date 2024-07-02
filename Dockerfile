# Dockerfile

# Utiliza una imagen base más pequeña y específica para Node.js
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Instala las dependencias de sharp
RUN apk add --no-cache \
  vips-dev

# Copia el código de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3010

# Ejecuta el servicio web al iniciar el contenedor
CMD ["npm", "start"]
