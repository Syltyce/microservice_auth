# Utiliser une image de base Node.js
FROM node:20.13.1-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source dans le conteneur
COPY . .

# Exposer le port utilisé par le microservice
EXPOSE 3000

# Démarrer le microservice
CMD ["npx", "nodemon", "start"]
