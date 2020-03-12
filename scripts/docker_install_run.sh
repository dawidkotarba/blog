#!/usr/bin/env bash

(cd .. && docker build -t blog "$PWD" && docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/)