#!/usr/bin/env bash

docker exec -it catalog_mysql bash -c "cd /myapp/mysql && sh bootstrap.sh"