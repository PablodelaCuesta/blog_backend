FROM node:lts-alpine

# Arguments of build
ARG MONGODB_USER=""
ARG MONGODB_PASSWORD=""

# environment variables
ENV PORT=8080
ENV SECRETPRIVATEKEY=""
ENV MONGODB_CNN="mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@restnode.1ambo.mongodb.net/restnode?retryWrites=true&w=majority"
ENV ADMIN_EMAIL=""
ENV ADMIN_EMAIL_PASS=""

# Builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
