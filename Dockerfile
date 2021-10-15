FROM node:16
RUN mkdir -p /src/user/app
WORKDIR /src/user/app
COPY . .
RUN npm install -g npm
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"]
