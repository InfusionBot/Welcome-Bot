FROM node:14
RUN mkdir -p /src/user/app
WORKDIR /src/user/app
COPY . .
RUN npm install
RUN apt-get update && apt-get install -y ffmpeg
EXPOSE 8080
CMD ["node", "webserver.js" ]
