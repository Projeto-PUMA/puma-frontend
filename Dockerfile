FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /puma-frontend
WORKDIR /puma-frontend
COPY ./puma-frontend ./

RUN npm install

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3001; \
	else \
	npm run start; \
	fi

EXPOSE 3000
