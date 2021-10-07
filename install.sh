#!/usr/bin/env bash

if test -f './.installed'; then
    echo "Already installed."
    exit 0
fi

echo "npm install..."
$(cd ./src && npm ci)
$(cd ../)

docker-compose up -d

echo "Standard passrord value: password"
echo "Please wait..."
sleep 15s

docker exec -it catalog_mysql bash -c "cd /myapp/mysql && sh bootstrap.sh"

touch .installed

echo "Environment is ready to use."
echo "Application can be accessed by http://localhost:9001"