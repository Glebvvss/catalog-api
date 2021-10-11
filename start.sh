#!/usr/bin/env bash

if test -f './.installed'; then
  $(cd ./src && npm ci)
  sudo docker-compose up -d
  echo "Environment is ready to use."
  echo "Application can be accessed by http://localhost:9001"
  exit 0
fi

echo "npm install..."
$(cd ./src && npm ci)
$(cd ../)

sudo docker-compose up -d

echo "Standard password value: password"
echo "Please wait..."
sleep 15s

sh migrate.sh

touch .installed
echo "Environment is ready to use."
echo "Application can be accessed by http://localhost:9001"