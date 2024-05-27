FROM node:18-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install --force
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


