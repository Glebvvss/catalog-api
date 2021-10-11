#!/usr/bin/env bash

sudo docker exec -it catalog_mysql bash -c "cd /myapp/mysql && sh bootstrap.sh"