FROM node:16

WORKDIR /app
COPY package.json /app
COPY vite.config.js /app
RUN npm install
COPY . /app

EXPOSE 5173
CMD ["npm", "run", "dev"]

