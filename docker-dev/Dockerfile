FROM node:15.14.0-alpine3.13

WORKDIR /home/node/app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh gcc  g++ libpng-dev zlib make autoconf automake python2 libsass optipng jpeg libtool \
                       nasm  libpng libpng-dev dpkg pkgconfig

# Данные пользователя
ARG UID=1000
ARG GID=1000

ENV UID=${UID} GID=${GID}

RUN wget -qP /tmp/ https://github.com/just-containers/s6-overlay/releases/download/v1.21.4.0/s6-overlay-amd64.tar.gz \
    && tar xzf /tmp/s6-overlay-amd64.tar.gz -C / && rm /tmp/s6-overlay-amd64.tar.gz

#s6-overlay init
ENTRYPOINT ["/init"]
