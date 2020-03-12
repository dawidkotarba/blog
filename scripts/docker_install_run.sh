#!/usr/bin/env bash

DIR=$(dirname "$(readlink -f "$0")")
(cd ${DIR}/..; \
docker build -t blog "$PWD"  \
&& docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/jekyll blog)