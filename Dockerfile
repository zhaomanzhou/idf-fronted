FROM nginx:1.15.2-alpine
COPY ./dist /var/idf/dist/
COPY nginx_idf.conf /etc/nginx/conf.d/
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]
