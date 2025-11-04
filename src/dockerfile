# Stage 1: Build the Angular application
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Stage 2: Serve the application using nginx
FROM nginx:alpine
COPY --from=build /app/dist/angular-practice /usr/share/nginx/html
EXPOSE 80
 
# Copy custom nginx configuration if needed
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
 
CMD ["nginx", "-g", "daemon off;"]