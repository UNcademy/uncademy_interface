FROM node:14.17.4-stretch
# Create app directory
WORKDIR /UNcademy_interface

# Install app dependencies
COPY package.json /UNcademy_interface/
RUN npm install

# Bundle app source
COPY . /UNcademy_interface/

EXPOSE 9000

CMD ["npm", "run", "start"]
