#!/usr/bin/env bash

DIR=$(dirname "$(readlink -f "$0")")
(cd ${DIR}/.. && sudo docker restart blog)