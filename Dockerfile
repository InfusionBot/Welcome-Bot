FROM node:14
RUN mkdir -p /src/user/app
WORKDIR /src/user/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start" ]
