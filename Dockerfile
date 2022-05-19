FROM node:slim
WORKDIR /app
ADD . /app
RUN  yarn && \
    yarn run build && \
    yarn cache clean
CMD [ "npm", "start" ]
EXPOSE 8080
