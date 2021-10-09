#!/usr/bin/env bash

if test -f './.installed'; then
  docker-compose up -d
  echo "Environment is ready to use."
  echo "Application can be accessed by http://localhost:9001"
  exit 0
fi

echo "npm install..."
$(cd ./src && npm ci)
$(cd ../)

docker-compose up -d

echo "Standard password value: password"
echo "Please wait..."
sleep 15s

docker exec -it catalog_mysql bash -c "cd /myapp/mysql && sh bootstrap.sh"

touch .installed
echo "Environment is ready to use."
echo "Application can be accessed by http://localhost:9001"