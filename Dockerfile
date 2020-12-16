FROM node:12.16.3 as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build

# production environment
FROM nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

RUN echo "daemon off;" >> /etc/nginx/nginx.conf


EXPOSE 80
CMD service nginx start
