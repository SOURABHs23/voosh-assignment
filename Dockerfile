FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm install 
WORKDIR /client
RUN npm install && npm run build
WORKDIR /app
CMD ["npm", "run", "deploy"]
EXPOSE 8080
