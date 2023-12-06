FROM node:16.15.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["docker_spec/entry_point.sh"]
