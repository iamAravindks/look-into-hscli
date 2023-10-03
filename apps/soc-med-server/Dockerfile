FROM 

# create & set working directory
RUN mkdir -p /home/node/soc-med
WORKDIR /home/node/soc-med

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of soc-med-server
RUN mkdir -p apps/soc-med-server/dist
COPY --chown=node ./apps/soc-med-server/package.json ./apps/soc-med-server/
COPY --chown=node ./apps/soc-med-server/dist ./apps/soc-med-server/dist

# install dependencies
RUN npm install -w soc-med-server --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "soc-med-server", "start" ]
