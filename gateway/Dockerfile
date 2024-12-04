# Utiliser une image de base Node.js
FROM node:20.13.1-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /gateway

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source dans le conteneur
COPY . .

# Exposer le port utilisé par l'API Gateway
EXPOSE 4000

# Démarrer l'API Gateway
CMD ["npm", "start"]
