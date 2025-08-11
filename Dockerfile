# Etap 1: Budowanie aplikacji
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etap 2: Serwowanie przez nginx
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"] 