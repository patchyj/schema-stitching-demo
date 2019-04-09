FROM node:8

# Create app directory
WORKDIR /usr/src/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

# COMMANDS
# Build the image - docker build -t oddjob-node-client .  
# Spin up container - docker run -p 3000:3000 -d oddjob-node-client
# SSH into VM - docker exec -it oddjob-node-client /bin/bash
# kill all active container - docker kill $(docker ps -q)   
# remove all images - docker rmi $(docker images -q)  